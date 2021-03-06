import React from "react";
import "./style.css";
import { useState } from "react";
// import { quizData } from "./quizData";
import { listQuestions } from "./quizData";

function Quiz(props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [done, setDone] = useState(false);

  const [radio, setRadio] = useState("");
  const [checkAnswered, setCheckAnswered] = useState(false);

  const [score, setScore] = useState(0);
  //Xử lý next câu hỏi
  const handleNextQuestion = () => {
    const next = currentQuestion + 1;

    //set điều kiện câu hỏi hiện tại không được lớn hơn độ dài mảng
    if (currentQuestion < listQuestions.length - 1) {
      setCurrentQuestion(next);
      //reset nút submit để không được click khi người dùng chưa tích chọn đáp án.
      setCheckAnswered(false);
      //Reset nút radio
      setRadio("");
    } else {
      setDone(!done);
    }
  };

  //Xử lý nút radio
  const handleCheckRadio = (e, answerId, id, index) => {
    setRadio(e.target.value);
    setCheckAnswered(true);

    //Cộng điểm cho người chơi khi chọn đáp án đúng.
    if (answerId[index] === id) {
      setScore(score + 1);
    }
  };

  //Reset trò chơi.
  const handleReload = () => {
    window.location.reload();
  };
  return (
    <div className="container">
      <div className="header">
        <h2>
          {!done
            ? listQuestions[currentQuestion].title
            : `You answered ${score}/${listQuestions.length} questions correctly`}
        </h2>
        <ul>
          {!done
            ? listQuestions[currentQuestion].options.map((data, index) => (
                <li key={index}>
                  <input
                    type="radio"
                    id={index}
                    value={data.label}
                    //Radio sẽ checked khi target = đáp án đó.
                    checked={radio === data.label}
                    //Truyền isCorrect để xác định xem người dùng chọn đúng hay không.
                    onChange={(e) =>
                      handleCheckRadio(
                        e,
                        listQuestions.map((data, index) => data.answerId),
                        data.id,
                        index
                      )
                    }
                  />
                  <label htmlFor={index}> {data.label}</label>
                </li>
              ))
            : ""}
        </ul>
      </div>
      {/* Nếu hết câu hỏi thì hiện nút Reload */}
      {!done ? (
        //Nếu người chơi chưa chọn đáp án thì đổi nút không có hàm onClick.
        checkAnswered ? (
          <button onClick={handleNextQuestion}>Submit</button>
        ) : (
          <button>Submit</button>
        )
      ) : (
        <button onClick={handleReload}>Reload</button>
      )}
    </div>
  );
}

export default Quiz;
