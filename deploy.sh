#!/bin/bash
echo "DoUHave Site S3 Deployer"
echo "------------------------------------"
echo
read -p "Did you need to update the version? (Y/N): " need
[[ $need == [yY] || $need == [yY][eE][sS] ]] && (read -p "Did you update it? (Y/N): " version && [[ $version == [yY] || $version == [yY][eE][sS] ]] || exit 1)

branch=$(git symbolic-ref --short HEAD)
read -p "The best practice is to commit before deploying. Do a commit now? " doCommit
[[ $doCommit == [yY] || $doCommit == [yY][eE][sS] ]] && read -p "Please enter a message for the commit: " message
if [[ $doCommit == [yY] || $doCommit == [yY][eE][sS] ]] 
then
    git add .
    git commit -m "$message"
    git push origin $branch
fi

if [ $branch == dev ]; then
    s3bucket="web-dev.douhave.co"
    env_file=".env.dev"
elif [ $branch == staging ]; then
    echo "The staging branch does not currently have a remote infrastructure established"
    exit 1
    # s3bucket="web-staging.douhave.co"
    # env_file=".env.staging"
elif [ $branch == main ]; then
    s3bucket="www.douhave.co"
    env_file=".env.prod"
else
    echo "Invalid branch for this script"
    exit 1
fi

commit=$(git rev-parse --short=7 HEAD)
message=$(git log -1 --pretty=format:"%s")

# build the app before deploy
env-cmd -f $env_file npm run build

echo "S3 Bucket:    $s3bucket"
echo "Current Branch: $branch"
echo "Current Commit: $commit - $message"
echo "--------"
echo "About to deploy to s3 bucket: $s3bucket"
read -p "Are you ready to deploy? (Y/N): " confirm && [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]] || exit 1
~/.aws/mfa
npm run copy-build
aws s3 cp ./build s3://$s3bucket --recursive --exclude \"*.DS_Store\" --exclude \"index.html\" --cache-control public,max-age=604800 
aws s3 cp ./build/index.html s3://$s3bucket  --cache-control public,max-age=604800

# CloudFront invalidations
# please add text files with cf_dist prefix to make this work
cf_dist=$(<cf_dist_$branch)
if [ ${#cf_dist} -ge 10 ]; then
    echo "Invalidating CloudFront Distribution $cf_dist" 
    aws cloudfront create-invalidation --distribution-id $cf_dist --paths "/*"
else
    echo "Did not find a CloudFront distribution, could not invalidate"
fi

echo "Completed deployment."