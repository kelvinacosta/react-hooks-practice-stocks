import React,{useState,useEffect} from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  
  const [stocks,setStocks] = useState([])
  const [portfolio,setPortfolio] = useState([])
  const [sortBy,setSortBy] = useState("Alphabetically")
  const [filterBy,setFilterBy] = useState("All")
  
  useEffect(()=>{
    fetch("http://localhost:3001/stocks")
    .then(response=>response.json())
    .then(data=>setStocks(data))
    .catch(err=>console.error("Error Getting Stocks",err))
  },[])

  const handleClickPortfolio = (addStock) => {
    
    const foundStock = portfolio.find(stock=>stock.id===addStock.id)
    if(!foundStock){

      setPortfolio([...portfolio,addStock])
    }
  }
  const removeStock = (removeStock) => {
    const removingStock = portfolio.filter(stock => stock.id !== removeStock.id)
    setPortfolio(removingStock)
  }

  const sortingStocks = [...stocks].sort((stockA,stockB)=>{
    if(sortBy === "Alphabetically"){
      return stockA.name.localeCompare(stockB.name)
    }else{
      return stockA.price - stockB.price
    }

  })
  const filteredStocks = sortingStocks.filter(stock=> {
    if(filterBy==="All"){
      return true
    }else{
      return stock.type.toLowerCase() === filterBy.toLowerCase()
    }
  })
  
  return (
    <div>
      <SearchBar sortBy={sortBy} setSortBy={setSortBy} filterBy={filterBy} setFilterBy={setFilterBy}/>
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={filteredStocks} onClickStock={handleClickPortfolio}/>
        </div>
        <div className="col-4">
          <PortfolioContainer portfolio={portfolio} onClickStock={removeStock}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
