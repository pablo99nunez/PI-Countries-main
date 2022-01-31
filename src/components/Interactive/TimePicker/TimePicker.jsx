import React, { useEffect, useState } from 'react';

import './TimePicker.css';
import Button from '../Button/Button';

export default function TimePicker ({ onSubmit, onClose = () => {} }) {
  const [hour, setHour] = useState('00');
  const [minute, setMinute] = useState('00');
  const [selected, setSelect] = useState(false);
  const [activeHour, setActiveHour] = useState();
  const [activeMinute, setActiveMinute] = useState(0);
  const [acumulado, setAcumulado] = useState(0);

  useEffect(() => {
    if (activeHour || activeHour === 0) {
      setHour(
        (activeHour + acumulado).toString().length == 1
          ? '0' + activeHour + acumulado
          : activeHour + acumulado
      );
      setSelect(true);
      setAcumulado(acumulado + activeHour)
    }
  }, [activeHour]);
  useEffect(() => {
    setHour(acumulado)
  }, [acumulado])
  useEffect(() => {
    setMinute(
      activeMinute.toString().length == 1
        ? '0' + activeMinute.toString()
        : activeMinute.toString()
    );
  }, [activeMinute]);
  return (

    <div className="timePicker">
      <div className="time">
        <div className="less24" onClick={() => {
          if (acumulado >= 24) {
            setAcumulado(acumulado - 24)
          }
        }}><h2>-</h2></div>
        <h1>
          {hour || '00'}:{minute}
        </h1>
        <div className="plus24" onClick={() =>
          setAcumulado(acumulado + 24)
        }><h2>+</h2></div>
      </div>
      <div className="picker">
        <div className="center"></div>
        <div
          className="line"
          style={{
            transform: `rotateZ(${
              selected ? (activeMinute / 5) * 30 : activeHour * 30
            }deg) scale(${
              !selected ? (activeHour > 12 ? '.5' : '0.9') : '0.9'
            })`
          }}
        ></div>
        {!selected
          ? (
          <div className="hour">
            <div
              className={`number ${activeHour == 1 ? 'activeTime' : ''}`}
              onClick={() => setActiveHour(1)}
              style={{ top: '12.5px', right: '44px' }}
            >
              <h3>1</h3>
            </div>

            <div
              className={`number ${activeHour == 2 ? 'activeTime' : ''}`}
              onClick={() => setActiveHour(2)}
              style={{ top: '44px', right: '12.5px' }}
            >
              <h3>2</h3>
            </div>

            <div
              className={`number ${activeHour == 3 ? 'activeTime' : ''}`}
              onClick={() => setActiveHour(3)}
              style={{ bottom: '90px', right: '0px' }}
            >
              <h3>3</h3>
            </div>
            <div
              className={`number ${activeHour == 4 ? 'activeTime' : ''}`}
              onClick={() => setActiveHour(4)}
              style={{ bottom: '44px', right: '12.5px' }}
            >
              <h3>4</h3>
            </div>
            <div
              className={`number ${activeHour == 5 ? 'activeTime' : ''}`}
              onClick={() => setActiveHour(5)}
              style={{ bottom: '12.5px', right: '44px' }}
            >
              <h3>5</h3>
            </div>
            <div
              className={`number ${activeHour == 6 ? 'activeTime' : ''}`}
              onClick={() => setActiveHour(6)}
              style={{ bottom: '0px', left: '90px' }}
            >
              <h3>6</h3>
            </div>

            <div
              className={`number ${activeHour == 7 ? 'activeTime' : ''}`}
              onClick={() => setActiveHour(7)}
              style={{ bottom: '12.5px', left: '44px' }}
            >
              <h3>7</h3>
            </div>
            <div
              className={`number ${activeHour == 8 ? 'activeTime' : ''}`}
              onClick={() => setActiveHour(8)}
              style={{ bottom: '44px', left: '12.5px' }}
            >
              <h3>8</h3>
            </div>
            <div
              className={`number ${activeHour == 9 ? 'activeTime' : ''}`}
              onClick={() => setActiveHour(9)}
              style={{ bottom: '90px', left: '0px' }}
            >
              <h3>9</h3>
            </div>
            <div
              className={`number ${activeHour == 10 ? 'activeTime' : ''}`}
              onClick={() => setActiveHour(10)}
              style={{ top: '44px', left: '12.5px' }}
            >
              <h3>10</h3>
            </div>
            <div
              className={`number ${activeHour == 11 ? 'activeTime' : ''}`}
              onClick={() => setActiveHour(11)}
              style={{ top: '12.5px', left: '44px' }}
            >
              <h3>11</h3>
            </div>
            <div
              className={`number ${activeHour == 12 ? 'activeTime' : ''}`}
              onClick={() => setActiveHour(12)}
              style={{ top: '0', left: 'calc(100px - 12.5px)' }}
            >
              <h3>12</h3>
            </div>
            <div
              className={`number nLittle ${
                activeHour == 13 ? 'activeTime' : ''
              }`}
              onClick={() => setActiveHour(13)}
              style={{ top: '41px', right: '60px' }}
            >
              <h3>13</h3>
            </div>
            <div
              className={`number nLittle ${
                activeHour == 14 ? 'activeTime' : ''
              }`}
              onClick={() => setActiveHour(14)}
              style={{ top: '60px', right: '41px' }}
            >
              <h3>14</h3>
            </div>
            <div
              className={`number nLittle ${
                activeHour == 15 ? 'activeTime' : ''
              }`}
              onClick={() => setActiveHour(15)}
              style={{ bottom: '90px', right: '30px' }}
            >
              <h3>15</h3>
            </div>
            <div
              className={`number nLittle ${
                activeHour == 16 ? 'activeTime' : ''
              }`}
              onClick={() => setActiveHour(16)}
              style={{ bottom: '60px', right: '41px' }}
            >
              <h3>16</h3>
            </div>
            <div
              className={`number nLittle ${
                activeHour == 17 ? 'activeTime' : ''
              }`}
              onClick={() => setActiveHour(17)}
              style={{ bottom: '41px', right: '60px' }}
            >
              <h3>17</h3>
            </div>

            <div
              className={`number nLittle ${
                activeHour == 18 ? 'activeTime' : ''
              }`}
              onClick={() => setActiveHour(18)}
              style={{ bottom: '30px', left: '90px' }}
            >
              <h3>18</h3>
            </div>

            <div
              className={`number nLittle ${
                activeHour == 19 ? 'activeTime' : ''
              }`}
              onClick={() => setActiveHour(19)}
              style={{ bottom: '41px', left: '60px' }}
            >
              <h3>19</h3>
            </div>

            <div
              className={`number nLittle ${
                activeHour == 20 ? 'activeTime' : ''
              }`}
              onClick={() => setActiveHour(20)}
              style={{ bottom: '60px', left: '41px' }}
            >
              <h3>20</h3>
            </div>
            <div
              className={`number nLittle ${
                activeHour == 21 ? 'activeTime' : ''
              }`}
              onClick={() => setActiveHour(21)}
              style={{ bottom: '90px', left: '30px' }}
            >
              <h3>21</h3>
            </div>

            <div
              className={`number nLittle ${
                activeHour == 22 ? 'activeTime' : ''
              }`}
              onClick={() => setActiveHour(22)}
              style={{ top: '60px', left: '41px' }}
            >
              <h3>22</h3>
            </div>

            <div
              className={`number nLittle ${
                activeHour == 23 ? 'activeTime' : ''
              }`}
              onClick={() => setActiveHour(23)}
              style={{ top: '41px', left: '60px' }}
            >
              <h3>23</h3>
            </div>
            <div
              className={`number nLittle ${
                activeHour == 0 ? 'activeTime' : ''
              }`}
              onClick={() => setActiveHour(0)}
              style={{ top: '30px', left: 'calc(100px - 12.5px)' }}
            >
              <h3>00</h3>
            </div>
          </div>
            )
          : (
          <div className="minute">
            <div
              className={`number ${activeMinute == 5 ? 'activeTime' : ''}`}
              onClick={() => setActiveMinute(5)}
              style={{ top: '12.5px', right: '44px' }}
            >
              <h3>5</h3>
            </div>

            <div
              className={`number ${activeMinute == 10 ? 'activeTime' : ''}`}
              onClick={() => setActiveMinute(10)}
              style={{ top: '44px', right: '12.5px' }}
            >
              <h3>10</h3>
            </div>

            <div
              className={`number ${activeMinute == 15 ? 'activeTime' : ''}`}
              onClick={() => setActiveMinute(15)}
              style={{ bottom: '90px', right: '0px' }}
            >
              <h3>15</h3>
            </div>
            <div
              className={`number ${activeMinute == 20 ? 'activeTime' : ''}`}
              onClick={() => setActiveMinute(20)}
              style={{ bottom: '44px', right: '12.5px' }}
            >
              <h3>20</h3>
            </div>
            <div
              className={`number ${activeMinute == 25 ? 'activeTime' : ''}`}
              onClick={() => setActiveMinute(25)}
              style={{ bottom: '12.5px', right: '44px' }}
            >
              <h3>25</h3>
            </div>
            <div
              className={`number ${activeMinute == 30 ? 'activeTime' : ''}`}
              onClick={() => setActiveMinute(30)}
              style={{ bottom: '0px', left: '90px' }}
            >
              <h3>30</h3>
            </div>

            <div
              className={`number ${activeMinute == 35 ? 'activeTime' : ''}`}
              onClick={() => setActiveMinute(35)}
              style={{ bottom: '12.5px', left: '44px' }}
            >
              <h3>35</h3>
            </div>
            <div
              className={`number ${activeMinute == 40 ? 'activeTime' : ''}`}
              onClick={() => setActiveMinute(40)}
              style={{ bottom: '44px', left: '12.5px' }}
            >
              <h3>40</h3>
            </div>
            <div
              className={`number ${activeMinute == 45 ? 'activeTime' : ''}`}
              onClick={() => setActiveMinute(45)}
              style={{ bottom: '90px', left: '0px' }}
            >
              <h3>45</h3>
            </div>
            <div
              className={`number ${activeMinute == 50 ? 'activeTime' : ''}`}
              onClick={() => setActiveMinute(50)}
              style={{ top: '44px', left: '12.5px' }}
            >
              <h3>50</h3>
            </div>
            <div
              className={`number ${activeMinute == 55 ? 'activeTime' : ''}`}
              onClick={() => setActiveMinute(55)}
              style={{ top: '12.5px', left: '44px' }}
            >
              <h3>55</h3>
            </div>
            <div
              className={`number ${activeMinute == 0 ? 'activeTime' : ''}`}
              onClick={() => setActiveMinute(0)}
              style={{ top: '0', left: 'calc(100px - 12.5px)' }}
            >
              <h3>0</h3>
            </div>
          </div>
            )}
      </div>
      <div className="timeButtons">
        <Button color="#fc4545" value="Cancelar" onClick={() => {
          onClose()
        }}></Button>
        <Button value="Ok" onClick={() => {
          onSubmit(hour * 3600 + minute * 60)
          onClose()
        }}></Button>
      </div>
    </div>
  );
}
