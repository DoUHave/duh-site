import React, { Component } from "react";
import { FaCopy } from "react-icons/fa";
import { SiFacebook, SiLinkedin, SiPinterest, SiTwitter } from "react-icons/si";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";

/**
 * Modal UI to share post/item to social networks
 * @author dassiorleando
 */
class ShareBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: true,
      linkCopied: false,
    };
  }

  /**
   * Explicit share actions
   * @param {*} network
   */
  shareNow(network) {
    if (network === "facebook") {
      window.open(
        "https://www.facebook.com/sharer/sharer.php?u=" + this.props.link,
        "Share Facebook",
        "height=400, width=500"
      );
    } else if (network === "twitter") {
      window.open(
        "http://twitter.com/share?text=" +
          this.props.title +
          " " +
          this.props.link,
        "Share Twitter",
        "height=400, width=500"
      );
    } else if (network === "linkedin") {
      window.open(
        "https://www.linkedin.com/shareArticle?mini=true&url=" +
          this.props.link +
          "&title=" +
          this.props.title +
          "&summary=&source=",
        "Share Linkedin +",
        "height=400, width=500"
      );
    } else if (network === "pinterest") {
      window.open(
        "http://www.pinterest.com/pin/create/button/?url=" +
          this.props.link +
          "&media=" +
          this.props.img +
          "&description=" +
          this.props.title,
        "Share Pinterest",
        "height=400, width=500"
      );
    }
  }

  copyLink() {
    if(this.props.link){
    window.navigator.clipboard.writeText(`${this.props.link}/`);
    this.setState({ linkCopied: true });
    }
  }

  closeModal() {
    this.setState({ modal: false });
    if (this.props.onClosed) {
      this.props.onClosed();
    }
  }

  render() {
    return (
      <div className="ShareBox">
        <Modal
          isOpen={this.state.modal}
          toggle={() => {
            this.closeModal();
          }}
        >
          <ModalHeader className="block-center"> SHARE NOW </ModalHeader>
          <ModalBody className="block-center">
            {this.state.linkCopied ? (
              <div className="text-center">Link copied successfully.</div>
            ) : (
              <Row>
                <Col>
                  {" "}
                  <FaCopy
                    className="cursor-pointer"
                    onClick={() => {
                      this.copyLink();
                    }}
                  />{" "}
                </Col>
                <Col>
                  {" "}
                  <SiFacebook
                    className="cursor-pointer"
                    onClick={() => {
                      this.shareNow("facebook");
                    }}
                  />{" "}
                </Col>
                <Col>
                  {" "}
                  <SiTwitter
                    className="cursor-pointer"
                    onClick={() => {
                      this.shareNow("twitter");
                    }}
                  />{" "}
                </Col>
                <Col>
                  {" "}
                  <SiLinkedin
                    className="cursor-pointer"
                    onClick={() => {
                      this.shareNow("linkedin");
                    }}
                  />{" "}
                </Col>
                <Col>
                  {" "}
                  <SiPinterest
                    className="cursor-pointer"
                    onClick={() => {
                      this.shareNow("pinterest");
                    }}
                  />{" "}
                </Col>
              </Row>
            )}
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default ShareBox;
