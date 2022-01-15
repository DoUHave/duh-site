import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './LinkPreview.css'
import { parseLink } from "../../util/helper";

const isValidUrlProp = (props, propName, componentName) => {
  if (!props) {
    return new Error(`Required parameter URL was not passed.`)
  }
  if (!isValidUrl(props[propName])) {
    return new Error(
      `Invalid prop '${propName}' passed to '${componentName}'. Expected a valid url.`
    )
  }
}

const isValidUrl = (url) => {
  const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/
  const validUrl = regex.test(url)
  // return validUrl
  return true
}

function LinkPreview(props) {
  const [loading, setLoading] = useState(true)
  const [preview, setPreviewData] = useState({})
  const [failed, setFailed] = useState(false)
  const [isUrlValid, setUrlValidation] = useState(true)

  const {
    url,
    width,
    maxWidth,
    marginTop,
    marginBottom,
    marginRight,
    marginLeft,
    onClick,
    render
  } = props

  const api = 'https://lpdg.herokuapp.com/parse/link'

  const style = {
    width,
    maxWidth,
    marginTop,
    marginBottom,
    marginRight,
    marginLeft
  }

  useEffect(() => {
    async function fetchData() {
      if (isValidUrl(url)) {
        setUrlValidation(true)
      } else {
        return {}
      }
      setLoading(true)
      let metadata = await parseLink(url);
      // Hide the medatada for access denied page
      if (metadata && metadata.title && (metadata.title.indexOf('access denied') !== -1 || metadata.title.indexOf('Access Denied') !== -1 )) metadata = null;
      setPreviewData(metadata)
      setLoading(false)
    }
    fetchData()
  }, [url])

  if (!isUrlValid) {
    console.error(
      'LinkPreview Error: You need to provide url in props to render the component: ' + url
    )
    return null
  }

  /**
   * Hides the image tag if it failed to load.
   */
  function hideImage() {
    setFailed(true);
  }

  // If the user wants to use its own element structure with the fetched data
  if (render) {
    return render({
      loading: loading,
      preview: preview
    })
  } else if (loading) {
    return (
      <></>
    )
  } else {
    return (
      preview && !preview.error
        ? <>
            <div
              className={'link-preview-section'}
              style={style}
              onClick={onClick}
            >
              {
                !preview.isImage
                ? <div className={'link-description'}>
                    {/* <div className={'domain'}>
                      <span className={'link-url'}>{preview.domain}</span>
                    </div> */}
                    <div className={'link-data'}>
                      <div className={'link-title'}> { preview.title && <a href={url} target="_blank">{preview.title}</a> } </div>
                      { preview.description && <div className={'link-description'}>
                        {preview.description} 
                      </div> }
                    </div>
                  </div>
                :<></>
              }
              <div className={'link-image'} style={{ margin: preview.isImage ? 'auto' : 'unset' }}>
                {
                  !failed
                  ? <a href={url} target="_blank"><img src={preview.img} onError={hideImage} /></a>
                  : <></>
                }
              </div>
            </div>
        </>
      : <></>
    )
  }
}

LinkPreview.defaultProps = {
  onClick: () => {},
  width: '90%',
  maxWidth: '700px',
  marginTop: '18px',
  marginBottom: '18px',
  marginRight: 'auto',
  marginLeft: 'auto'
}

LinkPreview.propTyps = {
  url: isValidUrlProp,
  onClick: PropTypes.func,
  render: PropTypes.func,
  width: PropTypes.string,
  maxWidth: PropTypes.string,
  marginTop: PropTypes.string,
  marginBottom: PropTypes.string,
  marginRight: PropTypes.string,
  marginLeft: PropTypes.string
}

export default LinkPreview
