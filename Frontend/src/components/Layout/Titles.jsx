import React from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import {useNavigate} from 'react-router-dom';
function Titles({ title }) {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }
  return (
    <>
      <div className="headerSection">
        <button onClick={goBack}><BsArrowLeftShort /> Volver atras        </button>
        <h1> {title}</h1>
      </div>
    </>
  );
}

export default Titles;
