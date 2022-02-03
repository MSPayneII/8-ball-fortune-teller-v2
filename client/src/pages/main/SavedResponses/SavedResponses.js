import React, { useEffect } from "react";
import { useGlobalContext } from "../../../context/globalContext";
import "./SavedResponses.css";

const SavedResponses = () => {
  const { user, isLoading, getQAPairs, qAndAPairings } = useGlobalContext();

  useEffect(() => {
    getQAPairs(user);
  }, [qAndAPairings, getQAPairs, user]);

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (qAndAPairings.length === 0) {
    return (
      <div className="empty-table">
        <h1>
          <span className="empty-table-span">No Previously Saved Q&As.</span>
          <br /> Ask the 8-Ball some questions.
        </h1>
      </div>
    );
  }

  if (qAndAPairings) {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th scope="col" className="colhead">
                Questions
              </th>
              <th scope="col" className="colhead">
                Answers
              </th>
            </tr>
          </thead>
          <tbody className="answer-response-container">
            {qAndAPairings.map((pair, index) => {
              const { question, answer } = pair;
              return (
                <tr key={index}>
                  <td>{question}</td>
                  <td>{answer}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
};

export default SavedResponses;
