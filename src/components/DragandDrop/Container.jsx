  import update from 'immutability-helper'
  import { useCallback, useEffect, useState } from 'react'
  import { Card } from './Card.jsx'

export const Container = ( { Tiles, sorted, setSorted } ) => {
  // console.log([...Tiles])
  const defaultTiles = [...Tiles];

  const [cards, setCards] = useState(shuffleArray([...Tiles]))

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setCards((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      }),
    )
  }, [])

  const renderCard = useCallback((card, index) => {
    return (
      <Card
        src={card.src}
        key={card.id}
        index={index}
        id={card.id}
        moveCard={moveCard}
      />
    )
  }, [])

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (let i = 0; i < arr1.length; i++) {
      const obj1 = arr1[i];
      const obj2 = arr2[i];
      for (const key in obj1) {
        if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
          if (obj1[key] !== obj2[key]) {
            return false;
          }
        }
      }
    }
    return true;
  }

  useEffect(() => {
    if(arraysAreEqual(cards, defaultTiles)) setSorted(true)
    else setSorted(false)
  }, [cards]);

  useEffect(() => {
    // console.log('elements Changed')
    setCards(shuffleArray([...Tiles]))
  }, [Tiles])

  // console.log(defaultTiles)
  // console.log(sorted)
  // console.log(cards)
  // console.log(Tiles)

  return (
      cards.map((card, i) => renderCard(card, i))
  )
}
