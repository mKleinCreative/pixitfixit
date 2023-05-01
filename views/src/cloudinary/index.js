import React from "react";
class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
  }
  showWidget = () => {
    let widget = window.cloudinary.createUploadWidget(
      {
        cloudName: `dui3yyhou`,
        uploadPreset: `ecaxfmj9`,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log(result.info.url);
          this.props.setImgUrl(result.info.url)
        }
      }
    );
    widget.open();
  };
  render() {
    return (
      <div>
        <button onClick={this.showWidget}> Upload Image </button>
      </div>
    );
  }
}
export default ImageUpload;

