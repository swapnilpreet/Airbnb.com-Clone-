import { Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "../index.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function Cal() {
  const [start, setstart] = useState(new Date());
  const [end, setend] = useState(new Date());
  const [nights,setnights] = useState(0);
  const [showstart, setshowstart] = useState();
  const [showend, setshowend] = useState();

  function datediff(first, second) {        
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
   }

    function getstart(date){
      const year = date?.getFullYear();
      const month = date?.getMonth() + 1;
      const day = date?.getDate();

      const withSlashes = [day, month, year].join('-');
      setshowstart(withSlashes);
    }

    function getend(date){
      const year = date?.getFullYear();
      const month = date?.getMonth() + 1;
      const day = date?.getDate();
      const withSlashes = [day, month, year].join('-');
      setshowend(withSlashes);
    }
  
  useEffect(()=>{
    getstart(start)
    getend(end)
    setnights(datediff(start,end));
    localStorage.setItem("showstart",showstart)
    localStorage.setItem("showend",showend)
    localStorage.setItem("nights",nights)
  },[start,end,showend,showstart])


  return (
    <div>
       <Text>{showstart} - {showend}</Text>
       <Text>{nights}</Text>
      <DatePicker selected={start} onChange={(start) => setstart(start)}/>
      <DatePicker selected={end} onChange={(end) => setend(end)} />
    </div>
  );
}
