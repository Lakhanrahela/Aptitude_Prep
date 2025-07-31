export default function Footer(){
    return(
        <>
        <footer>
  <div className="footer-wrappper footer-bg">
    {/* Footer Start*/}
    <div className="footer-area footer-padding">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-xl-4 offset-md-5 col-lg-5 col-md-4 col-sm-6">
            <h1 className="text-light">COURSES</h1>
          </div>
          
        </div>
      </div>
    </div>
    {/* footer-bottom area */}
    <div className="footer-bottom-area">
      <div className="container">
        <div className="footer-border">
          <div className="row d-flex align-items-center">
            <div className="col-xl-12 ">
              <div className="footer-copy-right text-center">
                <p>
                  {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                  Copyright © All rights reserved
                  <i className="fa fa-heart" aria-hidden="true" /> by{" "}
                Courses
                  {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Footer End*/}
  </div>
</footer>

        </>
    )
}