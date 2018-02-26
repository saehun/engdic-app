// const data = require('./sample.js');
// var _ = require('lodash');
// var pretty = require('pretty');

import pretty from 'pretty';
import _ from 'lodash';
// var wordList = Object.keys(data);

let data = "";
let wordList = "";

/* 
consume: array of example english sentences
return : new array with sentences which is replaced; black for word
*/
function blanky(word, sentence, underscore) {
    let regEx = new RegExp(word, "ig");
    let pad = underscore ? "_".repeat(word.length) : "_____";

    return sentence.replace(regEx, pad);
}

function firstLetterAndBlank(word) {
    return word[0] + Array(word.length - 1).fill('_').join("");
}

function pickENKR(word) {
    let seed = getRandom(5);
    return [blanky(word, data[word].examplesEN[seed]), data[word].examplesKR[seed]];
}

function pickOne(word) {
    let seed = getRandom(5);
    return blanky(word, data[word].examplesEN[seed]);
}

//Random number 0~(num-1) generating
function getRandom(num) {
    return Math.floor(Math.random() * (num));
}

function elementTag(tag, text, attribute) {
    return "<" + tag + " " + attribute + ">" + text + "</" + tag + ">";
}

function attr(attrType, attrValue) {
    return attrType + "=" + "\"" + (Array.isArray(attrValue) ? attrValue.join(" ") : attrValue) +
        "\"";
}


function render(template, data) {
    return template.replace(/{{(.+?)}}/g, function(m, p1) {
        return data[p1]
    })
}

function getChoice(word) {
    let options = ['a', 'b', 'c', 'd'];
    let choices = _.chain(wordList).without(word).shuffle().slice(0, 3).concat(word).shuffle()
        .value();
    let answer = options[_.indexOf(choices, word)];
    return [choices.map((v, i) => { return options[i] + '. ' + v }), answer]
}



//KR and EN
function prob_1(word) {
    let c = getChoice(word);
    return { p: pickENKR(word), choices: c[0], answer: c[1], type: 1 };

}

function prob_2(word) {
    let c = getChoice(word);
    return {
        p: data[word].examplesEN.map((v) => { return blanky(word, v) }),
        choices: c[0],
        answer: c[1],
        type: 2
    };
}


function prob_3() {
    let answers = _.shuffle(_.slice('abcdefghijklmnopqrstuvwxyz'.split(''), 0, wordList.length));
    let sentences = _.shuffle(wordList.map((v) => { return [pickOne(v), v] }));
    let choices = _.chain(sentences)
        .map((v, i) => { return [answers[i], v[1]] })
        .sortBy((v) => (v[0]))
        .map((v) => { return v.join(". ") })
        .value();;
    return { p: _.map(sentences, (v) => { return v[0] }), choices: choices, answer: answers, type: 3 };
}


function prob_4() {
    return {
        EN: _.shuffle(wordList.map(x => "•" + "　" + x)),
        KR: _.chain(wordList).map((v) => { return data[v].meaning + "　" + "•" }).shuffle().value(),
        answer: 0,
        type: 4
    };
}


function prob_5() {
    let probs = _.chain(wordList).map((v) => { return [data[v].meaning, firstLetterAndBlank(v)] })
        .shuffle()
        .value();
    return {
        KR: _.map(probs, (v) => { return v[0] }),
        EN: _.map(probs, (v) => { return v[1] }),
        answer: 0,
        type: 5
    }
}

function markupArr(arr, tag) {
    return _.chain(arr).map((v) => {
        return render("<{{t}}>{{data}}</{{t}}>", { data: v, t: tag })
    }).join("").value();
}

function markup(prob, id) {
    let html;
    if (prob.type <= 3) {
        html = [
            "<div class=\"prob type-" + prob.type + "\" id=\"p" + id + "\">",
            "<h3 class=\"prob-num\">" + id + "</h3>",
            markupArr(prob.p, "p"),
            "<ul class=\"answers type-" + prob.type + "\">",
            markupArr(prob.choices, "li"),
            "</ul>",
            "</div>"
        ].join("")
    }
    else {
        html = [
            "<div class=\"prob type-" + prob.type + "\" id=\"p" + id + "\">",
            "<h3 class=\"prob-num\">" + id + "</h3>",
            "<ul class=\"left\">",
            markupArr(prob.KR, "li"),
            "</ul>",
            "<ul class=\"right\">",
            markupArr(prob.EN, "li"),
            "</ul>",
            "</div>"
        ].join("")
    }

    return pretty(html)

}

function markupAnsewr(arr) {

}



function problemSet() {
    let prob = [];

    let wordListShuffled = _.shuffle(wordList);

    // console.log("word Shuffled is : ", wordListShuffled);
    prob.push(prob_5());
    prob.push(_.map(wordListShuffled, (v) => { return prob_1(v) }));

    prob.push(prob_4())
    wordListShuffled = _.shuffle(wordListShuffled);
    prob.push(_.map(wordListShuffled, (v) => { return prob_2(v) }));
    prob.push(prob_3());

    // console.log("This is ProbSet", prob);

    return _.flatten(prob);
}

function answerSet(probSet) {
    return _.map(probSet, (v) => { return v.answer });
}

function markupAnswer(arr) {
    let processed = _.filter(_.zip(arr, Array(arr.length).fill().map((v, i) => (i + 1))),
        (x) => { return x[0] !== 0 });

    const toString = function(arr) {
        if (typeof(arr[0]) !== 'string') {
            arr[0] = arr[0].join(", ");
        }
        return "<span>" + arr[1] + "." + arr[0] + "</span>";
    };
    

    let html = "<div class=\"prob type-answer\">" + _.map(processed, toString).join("") + "</div>";
    
    return pretty(html);

}

export default function(wordData) {
    // console.log("Halo, this is middle module data is ", wordData);

    wordList = wordData.map(x => x.word);

    data = {};
    wordList.forEach((v, i) => {
        data[v] = wordData[i];
    })


    let p = problemSet();
    let answers = markupAnswer(answerSet(p));
    return _.chain(p).map((x, i) => markup(x, i + 1)).value().join("") + answers;
}
// console.log(markup(prob_3(), 22));
// console.log(prob_2('apple'));
// console.log(prob_3());
// console.log(prob_4());
// console.log(prob_5());

//TEST CASE
// console.log(blanky('apple', false));


// console.log(
//     pretty(
//         markup(
//             "div", ["section1", "section2", "section3"].map((v, i) => {
//                 return markup("article", "hello " + (i + 1), attr("id", v));
//             }), attr("class", "wrapper"))
//     )
// );


// var data1 = {
//     firstName: 'Mike',
//     lastName: 'Tyson'
// }

// var template = 'Hello my name is {{firstName}} {{lastName}}'

// console.log(render(template, data1))

// console.log(pickENKR("apple"));
