import {Col, Form, Input, Row} from "antd";
import {useEffect, useState} from "react";
// import { count } from '@wordpress/wordpresswordcount';
import { count } from 'countable';
import {syllable} from 'syllable';
import _ from 'lodash';

const {TextArea} = Input;

const calcFlesch = (wordCount, sentenceCount, syllableCount) => {
  const final = (206.835 - (1.015 * wordCount) / sentenceCount - (84.6 * syllableCount) / wordCount).toFixed(2);
  if(_.isNaN(final) || final === 'NaN') {
    return 0;
  } else {
    return final;
  }
}

const calcARI = (characterCount, wordCount, sentenceCount) => {
  const final = ((4.71 * characterCount) / wordCount + (0.5 * wordCount) / sentenceCount -21.43).toFixed(2);
  if(_.isNaN(final) || final === 'NaN') {
    return 0;
  } else {
    return final;
  }
}

// Flesch-Kincaid

const calcFleschKincaid = (wordCount, sentenceCount, syllableCount) => {
  const final = ((0.39 * wordCount) / sentenceCount + (11.8 * syllableCount) / wordCount - 15.59).toFixed(2);
  if(_.isNaN(final) || final === 'NaN') {
    return 0;
  } else {
    return final;
  }
}

const calcColemanLiau = (characterCount, wordCount, sentenceCount) => {
  const final = ((5.89 * characterCount) / wordCount - (30.0 * sentenceCount) / wordCount - 15.8).toFixed(2);
  if(_.isNaN(final) || final === 'NaN') {
    return 0;
  } else {
    return final;
  }
}

const calcGunning = (wordCount, sentenceCount, complexCount) => {
  const final = (0.4 * (wordCount / sentenceCount + (100.0 * complexCount) / wordCount )).toFixed(2);
  if(_.isNaN(final) || final === 'NaN') {
    return 0;
  } else {
    return final;
  }
}

const calcSmog = (complexCount, sentenceCount) => {
  const final = (Math.sqrt( complexCount * 30.0 / sentenceCount ) + 3.0).toFixed(2);
  if(_.isNaN(final) || final === 'NaN') {
    return 0;
  } else {
    return final;
  }
}


export const Reading = () => {
  const [content, setContent] = useState();
  // const [allCount, setAllCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  // const [paragraphCount, setParagraphCount] = useState(0);
  const [sentenceCount, setSentenceCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [syllableCount, setSyllableCount] = useState(0);
  const [complexCount, setComplexCount] = useState(0);

  useEffect(() => {
    const countThree = (content) => {
      let newComplexCount = 0;
      if(!_.isNil(content) && !_.isEmpty(content)) {
        content = content.replace(/\n/gmi, " ");
        content = content.replace(/[^0-9a-z ]/gi, '')
        const words = content.split(" ");
        words.forEach((word) => {
          if(syllable(word) >= 3) {
            newComplexCount++;
          }
        });
        setComplexCount(newComplexCount);
      }
    }

    const splitCounts = (counts) => {
      if(!_.isNil(counts)) {
        // setAllCount(counts.all);
        setCharacterCount(counts.characters);
        // setParagraphCount(counts.paragraphs);
        setSentenceCount(counts.sentences);
        setWordCount(counts.words);
      }
    }
    countThree(content);

    if(!_.isNil(content) && !_.isEmpty(content)) {
      count(content, counter => splitCounts(counter))
      setSyllableCount(syllable(content));
    } else {
      setSyllableCount(0);
      splitCounts({all: 0, characters: 0, paragraphs: 0, sentences: 0, words: 0})
    }
  }, [content]);


  return (
    <div>
      <Row>
        <Col span={4}>
          <Form.Item label="Flesch Reading Ease Score">
            <Input value={calcFlesch(wordCount, sentenceCount, syllableCount)}/>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Automated readability index">
          <Input value={calcARI(characterCount, wordCount, sentenceCount)}/>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Flesch-Kincaid grade level">
          <Input value={calcFleschKincaid(wordCount, sentenceCount, syllableCount)}/>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Coleman-Liau index">
          <Input value={calcColemanLiau(characterCount, wordCount, sentenceCount)}/>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Gunning fog index">
          <Input value={calcGunning(wordCount, sentenceCount, complexCount)}/>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="SMOG index">
          <Input value={calcSmog(complexCount, sentenceCount)}/>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <TextArea rows={20} value={content} onChange={(e) => {setContent(e.target.value)}}/>
      </Row>
    </div>
  );
}