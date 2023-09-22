import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Upload from "./Upload/index";

const ModalBody = ({
  sources,
  productId,
  media,
  handleRemovePhoto,
  handleAddPhoto,
  handleUpload,
}) => {
  const [tabs, setTabs] = useState([
    { value: "Assets" },
    { value: "Library" },
    { value: "Upload" },
  ]);
  const [active, setActive] = useState(0);
  const [photos, setPhotos] = useState([]);

  const BASE_API = "http://localhost:3000/api/v1";

  const handleChangeTab = (i) => {
    setActive(i);
  };

  return (
    <>
      <div className="col py-3">
        <ul className="nav nav-tabs mb-3">
          {tabs.map((e, i) => (
            <li className="nav-item" key={i}>
              <Link
                onClick={() => handleChangeTab(i)}
                className={`nav-link ${i === active ? "active" : ""}`}
              >
                {e.value}
              </Link>
            </li>
          ))}
        </ul>
        {active === 0 && (
          <>
            <ul className="list-unstyled">
              <li>
                <h5>Product photos</h5> Choose photo to delete from product
              </li>
            </ul>
            <div id="grid" class="grid-container">
              {sources.length > 0 ? (
                sources.map((e, i) => (
                  <div
                    style={{ backgroundImage: `url(${e.url})` }}
                    key={i}
                    id="image1"
                    class="griditem image1"
                  >
                    <button
                      onClick={() => handleRemovePhoto(e.media_id, productId)}
                      className="btn btn-danger delete-btn"
                    >
                      <i class="bi bi-trash3"></i>
                    </button>
                  </div>
                ))
              ) : (
                <div>No Image Yet</div>
              )}
            </div>
          </>
        )}
        {active === 1 && (
          <>
            <ul className="list-unstyled">
              <li>
                <h5>Photo Library</h5> Choose photos from <b>Library</b> to add
                to product
                <br />
                <br />
                <button
                  className="btn btn-dark add-btn"
                  onClick={() => setActive(2)}
                >
                  <i class="bi bi-cloud-upload"></i>
                </button>{" "}
                Upload photos from device
              </li>
            </ul>
            <div id="grid" class="grid-container">
              {media.length > 0 ? (
                media.map((e, i) => (
                  <div
                    style={{ backgroundImage: `url(${e.source})` }}
                    key={i}
                    id="image1"
                    class="griditem image1"
                  >
                    <button
                      onClick={() => handleAddPhoto(e.media_id, productId)}
                      className="btn btn-success add-btn"
                    >
                      <i class="bi bi-plus-circle"></i>
                    </button>
                  </div>
                ))
              ) : (
                <div>No Image Yet</div>
              )}
            </div>
          </>
        )}
        {active === 2 && (
          <>
            <ul className="list-unstyled">
              <li>
                <h5>Upload photo</h5> Choose photos from <b>Your device</b> to
                add to the library
              </li>
            </ul>
            <Upload handleUpload={handleUpload} />
          </>
        )}
      </div>
    </>
  );
};

const Modal = ({
  sources,
  productId,
  media,
  handleRemovePhoto,
  handleAddPhoto,
  handleUpload,
}) => {
  return (
    <div
      className="modal modal-xl"
      tabIndex={-1}
      id="exampleModal"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Product Images</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div
            className="modal-body row flex-nowrap"
            style={{
              padding: "0 12px 0 12px",
              position: "relative",
            }}
          >
            <ModalBody
              handleRemovePhoto={handleRemovePhoto}
              handleAddPhoto={handleAddPhoto}
              handleUpload={handleUpload}
              productId={productId}
              sources={sources}
              media={media}
            ></ModalBody>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
