import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";

import SingleProductInfo from "./SingleProductInfo";

const ZoomProduct = ({ isZoomOpen, setZoomOpen, product }) => {
  const handleClose = () => {
    setZoomOpen(false);
  };
  const [image, setImage] = useState(product.images[0]);

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={isZoomOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <>
          <div className={"flex gap-3 my-3 bg-gray-50 border border-zinc-200"}>
            <div className="w-35 h-full md:w-70 md:h-full lg:w-90 lg-h-full ">
              <div className="max-w-35 h-auto md:max-w-70 md:h-auto lg:max-w-90 lg-h-auto  overflow-hidden shadow ">
                <img
                  src={image}
                  className="w-full h-full object-cover hover:scale-125 duration-300"
                />
              </div>

              <div className="w-35 h-auto md:w-70 lg:w-90 flex overflow-hidden justify-around my-3">
                <img
                  src={product?.images[0]}
                  className=" w-15 h-auto "
                  onClick={() => setImage(product?.images[0])}
                />
                {product?.images[1] && (
                  <img
                    src={product?.images[1]}
                    className="w-15 h-auto  "
                    onClick={() => setImage(product?.images[1])}
                  />
                )}
              </div>
            </div>

            <div className=" flex-1">
              <SingleProductInfo product={product} />
            </div>
          </div>
          <div>{/* <ProductDetails product={product} /> */}</div>
        </>
      </Dialog>
    </React.Fragment>
  );
};

export default ZoomProduct;
