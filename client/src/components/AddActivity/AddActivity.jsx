import React, { useEffect, useState } from "react";
import "./AddActivity.css";
import Select from "../Interactive/Select/Select";
import Button from "../Interactive/Button/Button";
import Error from "../Interactive/Error/Error";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router";
import Options from "../Options/Options";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../Interactive/Alert/Alert";
import { addActivities, getCountries } from "../../redux/actions/countryAction";
import TimePicker from "../Interactive/TimePicker/TimePicker";
import timer from "../../assets/icons/timer.svg";
import { getHours } from "../SecondsTranslate";

export default function AddActivity() {
  const [duration, setDuration] = useState(0);
  const [time, showTime] = useState(false);
  const [created, setCreated] = useState({});
  const { pais } = useParams();
  const countries = useSelector((state) => state.countries);
  const activities = useSelector((state) => state.activities);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const url=`https://patriam-back.herokuapp.com`

  const [errors, setErrors] = useState({
    name: "",
    season: "",
    duration: "",
    difficulty: "",
    IDs: "",
  });
  const [input, setInput] = useState({
    name: "",
    season: "Verano",
    duration: "",
    difficulty: "1",
    IDs: [],
  });
  useEffect(async () => {
    await dispatch(getCountries());
  }, []);
  useEffect(() => {
    if (pais) {
      setInput({
        ...input,
        IDs: [countries.find((e) => e.name == pais)?.id],
      });
    }
  }, [countries]);

  function preSubmit() {
    if (input.name.trim() == "") {
      setErrors({ ...errors, name: "Debes ingresar un nombre" });
      throw new Error("Debes ingresar un nombre");
    }
    if (input.duration == "" || input.duration == 0) {
      setErrors({ ...errors, duration: "Debes ingresar una duracion" });
      throw new Error("Debes ingresar una duracion");
    }
    if (!input.IDs[0]) {
      setErrors({ ...errors, IDs: "Debes ingresar al menos un pais" });
      throw new Error("Debes ingresar al menos un pais");
    }
    let activity = activities.find((e) => (e.name = input.name));
    let existentIDsActivities = activity ? activity.IDs : [];
    dispatch(
      addActivities({
        name: input.name,
        IDs: [...existentIDsActivities, ...input.IDs],
      })
    );
    dispatch(getCountries());
    setInput({
      ...input,
      name: "",
      duration: "",
      difficulty: 1,
    });
  }

  function validate() {
    let errores = {};
    if (input.name.trim() == "") {
      errores.name = "No puede estar vacio";
    }
    return errores;
  }
  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handlePaisesInput = (e) => {
    if (e.key == "Enter") {
      console.log("KEY=ENTER");
      let found = countries.filter((pais) =>
        pais.name.toLowerCase().includes(e.target.value.toLowerCase())
      ).sort((a,b)=>{
        if(a.length-e.target.value.length < b.length-e.target.value.length){
          return 1
        }else return -1
      })[0]
      ;
      console.log("found", found);
      if (found) {
        if (!input.IDs.includes(found.id)) {
          setInput({ ...input, IDs: [...input.IDs, found.id] });
          console.log("Ingresado", found.id);
          return found.name;
        } else {
          setErrors({ ...errors, IDs: "Ya ingresaste ese pais" });
          return false;
        }
      } else {
        setErrors({ ...errors, IDs: "No existe el pais ingresado" });
        return false;
      }
    }
  };
  const handlePaisesErase = (e) => {
    const found = countries.find((pais) => pais.name == e);
    console.log(found);
    setInput((oldState) => {
      oldState.IDs = oldState.IDs.filter((pais) => pais != found.id);
      return oldState;
    });
  };
  useEffect(() => {
    setErrors(validate(input));
  }, [input]);
  useEffect(() => {
    setInput({ ...input, duration });
  }, [duration]);
  
  
  return (
    <div className="activityPage">
      <h1 className="titlePage">Añadir actividad turistica.</h1>
      <div className="form">
        <div className="inputBox">
          <h2>Nombre</h2>
          <input
            type="text"
            name="name"
            value={input.name}
            onChange={handleInputChange}
          />
          {errors.name && <Error e={errors.name}></Error>}
        </div>
        <div className="inputBox">
          <h2>Dificultad</h2>

          <Select
            opt={[1, 2, 3, 4, 5]}
            name="difficulty"
            onSelect={(e) => {
              setInput({ ...input, difficulty: e });
            }}
          ></Select>
        </div>
        <div className="inputBox">
          <h2>Duracion</h2>
          <div className="durationPicker">
            <img src={timer} alt="duracion" style={{ 
              background: "white",
              padding:'10px',
              borderRadius:'5px',
              cursor:'pointer'
              }} onClick={()=>showTime(!time)}/>
            {time ? (
              <TimePicker
                onClose={() => showTime(false)}
                onSubmit={(e) => setDuration(e)}
              ></TimePicker>
            ) : null}
            <h2>{getHours(duration)} horas</h2>
            {errors.duration && <Error e={errors.duration}></Error>}
          </div>
        </div>
        <div className="inputBox">
          <h2>Temporada</h2>
          <Select
            opt={["Verano", "Invierno", "Otoño", "Primavera"]}
            name="season"
            onSelect={(e) => {
              setInput({ ...input, season: e });
            }}
          ></Select>
        </div>
        <div className="inputBox">
          <h2>Paises</h2>

          <Options
            handle={handlePaisesInput}
            onErase={handlePaisesErase}
            value={[pais]}
          ></Options>
          {errors.IDs && <Error e={errors.IDs} />}
        </div>
        <div className="botonesActivity">
          <Link to="/home">
            <Button
              value="Cancelar"
              color="#AE4545"
              onClick={() => {}}
            ></Button>
          </Link>

          <Button
            value="Añadir"
            color="#45AE45"
            type="submit"
            onClick={() => {
              preSubmit();
              fetch(`${url}/activity`, {
                method: "post",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(input),
              })
                .then(() => {
                  setCreated({
                    type: "infoType",
                    value: "Actividad creada satisfactoriamente",
                  });
                })
                .catch((e) => {
                  console.log(e);
                  setCreated({
                    type: "warningType",
                    value: "Ha ocurrido un error\n"+e,
                  });
                });
            }}
          ></Button>

          {created.value && (
            <Alert
              type={created.type}
              value={created.value}
              buttons={["Volver a Home", "Agregar otra"]}
              onClick={[
                () => {
                  window.location.href='/home';
                },
                () => {
                  created.value=""
                },
              ]}
            />
          )}
        </div>
      </div>
    </div>
  );
}
