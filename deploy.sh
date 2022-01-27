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
elif [ $branch == prod ]; then
    s3bucket="web.douhave.co"
else
    echo "Invalid branch for this script"
    exit 1
fi

commit=$(git rev-parse --short=7 HEAD)
message=$(git log -1 --pretty=format:"%s")
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
echo "Completed deployment."