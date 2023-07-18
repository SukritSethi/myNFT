import React, { useState, useEffect } from "react";
import "./myHolding.scss";
import { getSuggestedQuery } from "@testing-library/react";

const IndiNFT = (props) => {
  const [imgurl, setImgurl] = useState(null);
  const [isIMG, setIsIMG] = useState(false);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-API-KEY": process.env.REACT_APP_API_KEY_OPENSEA,
    },
  };
  const handleClick = () => {
    console.log("burra");
    const url = `https://opensea.io/assets/ethereum/${props.contractAddress}/${props.tokenID}`; // Replace with your desired URL
    window.open(url, "_blank");
  };
  useEffect(() => {
    fetch(
      `https://api.opensea.io/v2/chain/ethereum/contract/${props.contractAddress}/nfts/${props.tokenID}`,
      options
    )
      .then((response) => response.json())
      //   .then((response) => console.log(response.nft.image_url))
      //   .then(setIsIMG(true))
      .then((response) => setImgurl(response))
      //   .then(console.log(imgurl.nft))
      .catch((err) => {
        console.error(err);
        setIsIMG(false);
        return;
      });
    setIsIMG(true);
  }, []);
  if (!imgurl) {
    return <div className="">Loading...</div>;
  }

  return (
    <div
      key={props.contractAddress + props.tokenID}
      className="reponse__container"
      onClick={handleClick}
    >
      <div className="response__img">
        {isIMG && (
          <>
            <img src={imgurl.nft.image_url} className="nftimg" alt="" />
            {/* {console.log(imgurl.nft.image_url)} */}
          </>
        )}
      </div>
      <div className="response__flex">
        <div className="response__nft">{props.tokenName}</div>{" "}
        <div className="response__nft_id">#{props.tokenID}</div>{" "}
      </div>
    </div>
  );
};

export default IndiNFT;
