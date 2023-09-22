function Carousel() {
  return (
    <div id="carouselExampleCaptions" className="carousel slide">
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to={0}
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        />
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to={1}
          aria-label="Slide 2"
        />
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to={2}
          aria-label="Slide 3"
        />
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            style={{ objectFit: "cover" }}
            src="https://file.hstatic.net/200000404397/file/6023b125dca80cf655b9_e08bd42801f74ac496c34ea9eb488ed2.jpg"
            className="d-block w-100"
            alt="https://file.hstatic.net/200000404397/file/6023b125dca80cf655b9_e08bd42801f74ac496c34ea9eb488ed2.jpg"
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>First slide label</h5>
            <p>Some representative placeholder content for the first slide.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            style={{ objectFit: "cover" }}
            src="https://file.hstatic.net/200000404397/file/z4092993745728_54dfc62653706745c7f27e8e27bf88fb_f6e9cf8824764c55a474901efb057e39.jpg"
            className="d-block w-100"
            alt="https://file.hstatic.net/200000404397/file/z4092993745728_54dfc62653706745c7f27e8e27bf88fb_f6e9cf8824764c55a474901efb057e39.jpg"
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Second slide label</h5>
            <p>Some representative placeholder content for the second slide.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            style={{ objectFit: "cover" }}
            src="https://file.hstatic.net/200000404397/file/z4098277049814_2fcec2b2a9c5965d390c3cb7df844567_6891adec34ba40edafadbc9c58cb6869.jpg"
            className="d-block w-100"
            alt="https://file.hstatic.net/200000404397/file/z4098277049814_2fcec2b2a9c5965d390c3cb7df844567_6891adec34ba40edafadbc9c58cb6869.jpg"
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Third slide label</h5>
            <p>Some representative placeholder content for the third slide.</p>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Carousel;
