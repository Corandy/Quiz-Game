import React from 'react';
import { Table } from 'react-bootstrap';

//leaderboardcomponent of the leaderboard page
const LeaderBoardComponent = ({
        list = [], //list with items with propety userId and score
        userId = false, //string or false
        userMail = false //string or false
    }) => {
    return <Table bordered hover>
        <thead>
          <tr>
            <th>Rank</th>
            <th>User Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {list.map((result, index) => {
          //when the user is this record, the full name will be displayed and has a font-bold styling
          let thisUser = result.userId === userId;
          let username = thisUser ? userMail : 'player '+(index+1);
          let thisUserStyle = thisUser ? 'bold' : 400;
          return <tr style={{fontWeight:thisUserStyle}} key={index}>
            <td>{(index+1)}</td>
            <td>{username}</td>
            <td>{result.score*10}</td>
          </tr>
        })}
       </tbody>
    </Table>
}

export default LeaderBoardComponent;