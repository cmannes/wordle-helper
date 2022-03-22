import './App.css';
import {wordlist} from "./wordlist";
import {Button, Col, Form, Input, Row} from 'antd';
import {useState} from "react";
import _ from "lodash";

const {TextArea} = Input;

const App = () => {

  const [omit, setOmit] = useState('');
  const [include, setInclude] = useState('');

  const [found, setFoundState] = useState(['', '', '', '', '']);
  const [wrongSpot, setWrongSpotState] = useState(['', '', '', '', '']);

  const setFound = (position, letter) => {
    if (!_.isNil(position) && Number(position) >= 0 && Number(position) < 5) {
      const foundCopy = [...found];
      foundCopy[position] = letter;
      setFoundState(foundCopy);
    }
  }

  const setWrongSpot = (position, letter) => {
    if (!_.isNil(position) && Number(position) >= 0 && Number(position) < 5) {
      const wrongSpotCopy = [...wrongSpot];
      wrongSpotCopy[position] = letter;
      setWrongSpotState(wrongSpotCopy);
    }
  }

  const reset = () => {
    setOmit('');
    setFoundState(['', '', '', '', '']);
    setWrongSpotState(['', '', '', '', '']);
    setInclude('');
  }

  const rxOmit = new RegExp(`[${omit}]`);
  let rxInclStr = '';

  !_.isNil(include) && include !== '' && include.split('').forEach((letter) => {
    rxInclStr = `${rxInclStr}(?=.*${letter})`;
  });
  rxInclStr = `^${rxInclStr}.+`;
  const rxIncl = new RegExp(rxInclStr);

  const omitInclList = [];

  const remainingWords = [];

  let final = '';
  wordlist.forEach((word) => {

    const omitMatch = !(!_.isNil(omit) && omit !== '' && rxOmit.test(word));
    const inclMatch = _.isNil(include) || include === '' || rxIncl.test(word);

    if (omitMatch && inclMatch) {
      omitInclList.push(word);
    }

  });

  let wordCount = 0;

  omitInclList.sort().forEach((word) => {
    const match = [false, false, false, false, false];

    for (let i = 0; i < 5; i++) {
      match[i] = (_.isNil(found[i]) || found[i] === '');
      if (!match[i] && (word[i] === found[i])) {
        match[i] = true;
      }
    }

    let not = true;
    if (wrongSpot[0].includes(word[0]) || wrongSpot[1].includes(word[1]) || wrongSpot[2].includes(word[2]) || wrongSpot[3].includes(word[3]) || wrongSpot[4].includes(word[4])) {
      not = false;
    }

    if (match[0] && match[1] && match[2] && match[3] && match[4] && not) {
      if (_.isNil(final) || final === '') {
        final = word;
      } else {
        final = `${final}\n${word}`;
      }
      remainingWords.push(word);
      wordCount++;
    }
  });

  const count = {
    a: [0, 0, 0, 0, 0],
    b: [0, 0, 0, 0, 0],
    c: [0, 0, 0, 0, 0],
    d: [0, 0, 0, 0, 0],
    e: [0, 0, 0, 0, 0],
    f: [0, 0, 0, 0, 0],
    g: [0, 0, 0, 0, 0],
    h: [0, 0, 0, 0, 0],
    i: [0, 0, 0, 0, 0],
    j: [0, 0, 0, 0, 0],
    k: [0, 0, 0, 0, 0],
    l: [0, 0, 0, 0, 0],
    m: [0, 0, 0, 0, 0],
    n: [0, 0, 0, 0, 0],
    o: [0, 0, 0, 0, 0],
    p: [0, 0, 0, 0, 0],
    q: [0, 0, 0, 0, 0],
    r: [0, 0, 0, 0, 0],
    s: [0, 0, 0, 0, 0],
    t: [0, 0, 0, 0, 0],
    u: [0, 0, 0, 0, 0],
    v: [0, 0, 0, 0, 0],
    w: [0, 0, 0, 0, 0],
    x: [0, 0, 0, 0, 0],
    y: [0, 0, 0, 0, 0],
    z: [0, 0, 0, 0, 0]
  }

  !_.isNil(remainingWords) && remainingWords.forEach((word) => {
    for(let i = 0 ; i < 5 ; i++) {
      count[word[i]][i]++;
    }

  });

  let rowKey = 0;

  return (
    <div className="App">
      <Form layout='vertical'>
        <Row gutter={8}>
          <Col span={8} offset={2}>
            <Form.Item label='Omit'>
              <Input onChange={(e) => {
                setOmit(e.target.value)
              }} value={omit}/>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Include">
              <Input onChange={(e) => {
                setInclude(e.target.value)
              }} value={include}/>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label='&nbsp;'>
              <Button block onClick={() => {
                reset()
              }}>RESET</Button>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={4} offset={2}>
            <Form.Item label="One">
              <Input onChange={(e) => {
                setFound(0, e.target.value);
              }} value={found[0]}/>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="Two">
              <Input onChange={(e) => {
                setFound(1, e.target.value);
              }} value={found[1]}/>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="Three">
              <Input onChange={(e) => {
                setFound(2, e.target.value);
              }} value={found[2]}/>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="Four">
              <Input onChange={(e) => {
                setFound(3, e.target.value);
              }} value={found[3]}/>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="Five">
              <Input onChange={(e) => {
                setFound(4, e.target.value);
              }} value={found[4]}/>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={4} offset={2}>
            <Form.Item label="NotOne">
              <Input onChange={(e) => {
                setWrongSpot(0, e.target.value);
              }} value={wrongSpot[0]}/>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="NotTwo">
              <Input onChange={(e) => {
                setWrongSpot(1, e.target.value);
              }} value={wrongSpot[1]}/>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="NotThree">
              <Input onChange={(e) => {
                setWrongSpot(2, e.target.value);
              }} value={wrongSpot[2]}/>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="NotFour">
              <Input onChange={(e) => {
                setWrongSpot(3, e.target.value);
              }} value={wrongSpot[3]}/>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="NotFive">
              <Input onChange={(e) => {
                setWrongSpot(4, e.target.value);
              }} value={wrongSpot[4]}/>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <table width='100%'>
              <thead>
              <tr>
                <th>Letter</th>
                <th>One</th>
                <th>Two</th>
                <th>Three</th>
                <th>Four</th>
                <th>Five</th>
              </tr>
              </thead>
              <tbody>
              {
                Object.keys(count).map((letter) => {
                  if (count[letter][0] === 0 && count[letter][1] === 0 && count[letter][2] === 0 && count[letter][3] === 0 && count[letter][4] === 0) {
                    return null;
                  }
                  return (
                    <tr key={rowKey++}>
                      <td>{letter}</td>
                      <td align='right'>{count[letter][0]}</td>
                      <td align='right'>{count[letter][1]}</td>
                      <td align='right'>{count[letter][2]}</td>
                      <td align='right'>{count[letter][3]}</td>
                      <td align='right'>{count[letter][4]}</td>
                    </tr>
                  );
                })
              }
              </tbody>
            </table>
          </Col>
          <Col span={12}>
            <TextArea value={final} rows={wordCount}/>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default App;