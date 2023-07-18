import React, { useState } from "react";
import "./myHolding.scss";
import IndiNFT from "./IndiNFT";

const MyHolding = (props) => {
  const handleRefresh = () => {
    fetch(
      `https://api.verbwire.com/v1/nft/data/owned?walletAddress=${props.address}`,
      options
    )
      .then((response) => response.json())
      // .then((response) => console.log(response))
      .then(setisResponse(true))
      .then((response) => setapiResponse(response.nfts))
      .catch((err) => console.error(err));

    // const gabachang = response.nfts;
  };

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-API-Key": process.env.REACT_APP_API_KEY_VERBWIRE,
    },
  };

  const [isResponse, setisResponse] = useState(false);
  const [apiResponse, setapiResponse] = useState([]);

  return (
    <div className="holdings__container">
      <div className="holdings__title">
        <p className="holdings__headings">Owned NFTs</p>
      </div>
      <div className="response__container__main">
        {isResponse && (
          <>
            {/* {console.log(apiResponse)} */}
            {apiResponse.map((e) => (
              <IndiNFT contractAddress={e.contractAddress} tokenID={e.tokenID} tokenName={e.tokenName}/>
            ))}
          </>
        )}
      </div>
      <div className="holdings__refresh">
        <div className="holdings__button" onClick={handleRefresh}>
          refresh
        </div>
      </div>
    </div>
  );
};

export default MyHolding;
