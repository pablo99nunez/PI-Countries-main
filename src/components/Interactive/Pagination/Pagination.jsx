/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import React, { useRef, useEffect, useState, useCallback } from 'react';

import arrow from '../../../assets/icons/arrow.svg';
import './Pagination.css';

export default function Pagination({ content, per_page }) {
  const [page, _setPage] = useState(0);
  const [active, setActive] = useState(0);
  const [isLearn, setLearn] = useState(false);
  const [isMobile, setMobile] = useState(false);
  const pageRef = useRef(page)
  const pagination = useRef(null)
  const eventListeners = useRef(null)
  const setPage = (e) => {
    pageRef.current = e
    _setPage(e)
  }



  const swipe = useCallback(() => {
    let startX; let startY; const offsetX = 50; const offsetY = 50; let endX; let endY
    if (window.visualViewport.width <= 1000) {
      setMobile(true)

      const handleStart = e => {
        startX = e.touches[0].clientX
        startY = e.touches[0].clientY
      }
      const handleMove = e => {
        endX = e.touches[0].clientX
        endY = e.touches[0].clientY
      }
      const handleEnd = (e) => {
        if (endX < startX - offsetX && endY < startY + offsetY && endY > startY - offsetY) {
          console.log(pageRef.current, content.length - per_page)
          if (pageRef.current < content.length - per_page) { //RIGHT
            setLearn(true)
            setActive(active + 1)
            setPage(pageRef.current + per_page)
          }
        } else if (endY > startX - offsetX && endY < startY + offsetY && endY > startY - offsetY) {
          if (pageRef.current >= per_page) { //LEFT
            setLearn(true)
            setActive(active - 1)
            setPage(pageRef.current - per_page)
          }
        }
      }
      pagination.current.addEventListener('touchstart', handleStart)
      pagination.current.addEventListener('touchmove', handleMove)
      pagination.current.addEventListener('touchend', handleEnd)
      return [handleStart, handleMove, handleEnd]
    }
  }, [content])

  useEffect(() => {
    console.log("CONTENT:", content.length)
    if (eventListeners.current) {

      pagination.current.removeEventListener('touchstart', eventListeners.current[0], false)
      pagination.current.removeEventListener('touchmove', eventListeners.current[1], false)
      pagination.current.removeEventListener('touchend', eventListeners.current[2], false)
    }
    eventListeners.current = swipe()
    setPage(0)
    setActive(0)
  }, [content, swipe])
  return (
    <div className="pagination" ref={pagination}>
      <div
        className="contentWrapper"
      >
        {content.map((e) => e).slice(page, page + per_page)}
        <span
          className={`next ${page >= content.length - per_page ? 'disabled' : ''
            }`}
          onClick={() => {
            setActive(active + 1)
            setPage(page + per_page)
          }}
        >
          {' '}
          <img src={arrow} alt="next" />{' '}
        </span>
        <span
          className={`prev ${page === 0 ? 'disabled' : ''}`}
          onClick={() => {
            setActive(active - 1)
            setPage(page - per_page)
          }}
        >
          {' '}
          <img src={arrow} alt="prev" />{' '}
        </span>
      </div>
      {!isMobile
          ?
        <div className="pageIndex">
          {Array.apply(null, { length: Math.ceil(content.length / per_page) })
            .map((e, i) => {
              return (
                <div
                  className={`index ${active === i ? 'active' : ''}`}
                  key={i}
                  onClick={() => {
                    setActive(i);
                    setPage(i * per_page);
                  }}
                ></div>
                )})
              }
          </div>
          : null

        }
      {!isLearn && isMobile
        ? <div className="swipeLeft">
          <div className="swipeContent">
            <img src={arrow} alt="" />
            <h2>Swipe Left</h2>
          </div>
        </div>
        : null
      }
    </div>
  );
}
