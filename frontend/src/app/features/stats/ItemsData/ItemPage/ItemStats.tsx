export const ItemStats = () => {
  return (
    <div>
      {/* Top Left return to item list button*/}
      <div>
        <button>Back to Items</button>
      </div>

      <div className="">
        {/* Left Column - Item stats*/}
        <div>
          <div>
            <p>ItemName</p>

            <div>
              <img className="" src={""} alt={""} />
              <div>
                <p>Recipe</p>
                <div>
                  <img />
                  <p>+</p>
                  <img />
                </div>

                {/* Stats with images */}
                <div></div>
              </div>
            </div>

            {/* Item scription */}
            <div>
              <p></p>
            </div>
          </div>
        </div>

        {/*  Right Column - Best Champion for item + item pairing*/}
        <div>
          <div>
            <p>Best Item Holders</p>
            <div>
              {[].map((champion) => {
                return (
                  <div>
                    <img className="" src={""} alt={""} />
                    <div className="flex flex-col">
                      <p>{}</p>
                      <p>Avg Place</p>
                    </div>
                    <div className="flex flex-col">
                      <p>{}</p>
                      <p>Place Change</p>
                    </div>
                    <div className="flex flex-col">
                      <p>{}%</p>
                      <p>Play Rate</p>
                    </div>
                  </div>
                );  
              })}
            </div>
          </div>

          <div>
            <p>Best Item Pairing</p>
            {[].map((item) => {
              return (
                <div>
                  <img className="" src={""} alt={""} />
                  <div className="flex flex-col">
                    <p>{}</p>
                    <p>Avg Place</p>
                  </div>
                  <div className="flex flex-col">
                    <p>{}</p>
                    <p>Place Change</p>
                  </div>
                  <div className="flex flex-col">
                    <p>{}</p>
                    <p>Play Rate</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
