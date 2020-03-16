import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Images from "../components/Images";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
//image imports
import Occultism from "../components/Images/pictures/Occultism.png"
import Face from "../components/Images/pictures/Face.png"
import Sulfur from "../components/Images/pictures/Sulfur.png"
import Dog from "../components/Images/pictures/Dog.png"
import Thumb from "../components/Images/pictures/Thumb.png"

class Game extends Component{

  state = {
    mountGame: false,
    images: [
      {name: Occultism, data: 0}, 
      {name: Face, data: 1},
      {name: Sulfur, data: 2},
      {name: Dog, data: 3},
      {name: Thumb, data: 4}
    ],
    score: 0,
    highscore: 0,
    imageList: [],
    lose: false,
    startGame: true,
    win: false
  }

  // //Start or Stop Game
  // setTheState = () => {

  //   // Get random number for the image array
  //   let num = Math.floor(Math.random() * this.state.images.length);//this.state.images.length
  //   console.log(num);
  //   this.state.theImage.num = num;
  //   this.state.theImage.img = this.state.images[num].data;
  //   console.log(this.state.theImage)

  // }

  //When it mounts
  componentDidMount() {

  }

  shuffleArray = (array) => {
    for(let i = array.length-1; i > 0; i--){
      const j = Math.floor(Math.random() * (i+1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  //Randomize the Images
  checkImg = (e, data) => {
    const {imageList} = this.state;
    let correct = true;
    for(let i = 0; i < imageList.length; i++){
      if(imageList[i] === data){
        correct = false;
        break;
      }
    }
    if(correct){
      console.log("Got it right!")
      console.log(data)
      //Make new array with new image number
      let newArray = this.state.imageList
      console.log(newArray)
      let temp = []
      for(let i = 0; i <= newArray.length; i++){
        if(i == newArray.length){
          temp[i] = data
        } else {
          temp[i] = newArray[i]
        }
      }
      newArray = temp;
      // newArray = newArray.push(data)
      console.log(newArray)
      if(newArray.length > 1){
        newArray = newArray.sort()
      }

      //Update the Score and possibly highscore
      var newScore = (this.state.score + 10)
      if(newScore > this.state.highscore){
        this.setState({ 
          highscore: newScore
        })
      }
      //Set state for score and imageList
      this.setState({ 
        score: newScore,
        imageList: newArray,
        lose: false,
        startGame: false
      })
    } else {
      //Reset game
      this.setState({ 
        lose: true,
        score: 0,
        imageList: []
      })
    }
  }

  render() {
    const {score, lose, images, highscore, win, startGame} = this.state;
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Memory Game!</h1>
              <h3>Score: {score} HighScore: {highscore}
              {startGame && <h1>Pick an image and don't pick it again</h1>}
              {!startGame && lose && <h1>You guessed wrong</h1>}
              {!startGame && !lose && <h1>Correct</h1>}
              </h3>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            {!win && <Images>
              {this.shuffleArray(images)}
              {images.map(image => (
              <img src={image.name} onClick={((e) => this.checkImg(e, image.data))}></img>
              ))}
            </Images>}
            {win && <h1>YOU WON</h1>}
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Game;
