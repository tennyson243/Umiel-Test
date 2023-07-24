import React from "react";
import MainSaleCollection from "./MainSaleCollection";
import SideSaleCollection from "./SideSaleCollection";

const SaleCollection = () => {
  return (
    <>
      <main>
        <div className='container'>
          <section className='sideContent'>
            <SideSaleCollection />
          </section>
          <section className='mainContent'>
            <MainSaleCollection />{" "}
          </section>
        </div>
      </main>
    </>
  );
};

export default SaleCollection;
