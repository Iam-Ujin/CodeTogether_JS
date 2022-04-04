const $ = document.querySelector.bind(document);

const msg = {
    "not-found-mission-code" : "일치하는 미션코드를 찾을 수 없습니다",
    "needed-mission-code" : "미션코드를 입력하세요(ex. 1-3)",
    "right-mission-code" : "올바른 미션코드 입니다"
}

function toggleWarnMsg(node, direction) {
    if(direction==='fail') {
        node.classList.remove("text-green-500");
        node.classList.add("text-orange-500", "italic");
    } else {
        node.classList.add("text-green-500");
        node.classList.remove("text-orange-500", "italic");
    }
}

function getInputData(inputCount) {

    let inputValues = [];
    for(let i=1; i<=inputCount; i++) {
        const inputValue = $(`#input-value${i}`).value.trim();
        inputValues.push(inputValue);
    }
    return inputValues;
}

function getInputTemplateString(neededInputNodeCount) {

    let inputTplResult ="";

    for(let i=1; i<=neededInputNodeCount; i++) {
        const tpl = _tpl.input(i);
        inputTplResult += tpl;
    }
    return `<div id="input-value-wrapper">${inputTplResult}</div>`;
}

function submitBtnClickHandler(problemSet, e) {
	e.preventDefault();
    const missionCodeNode = $("#mission-code");
    const missionCode = missionCodeNode.value.trim();

    const {inputCount, runner} = problemSet[missionCode];
    const inputValueList = getInputData(inputCount);

    window[runner]?.(...inputValueList);
}

function missionCodeChangeHandler(problemSet,{target}) {
    const submitBtnContainer = $("#submit-btn-container");
    const missionCode = target.value.trim();

    if(!problemSet[missionCode]) { 
        toggleWarnMsg(target.nextElementSibling, 'fail');
        target.nextElementSibling.innerText= msg['not-found-mission-code'];
        return;
    }

    const {inputCount, name:missionName} = problemSet[missionCode];

    toggleWarnMsg(target.nextElementSibling, 'pass');
    target.nextElementSibling.innerText= `미션명 : ${missionName}`;

    const inputTemplateString = getInputTemplateString(inputCount);

    $("#input-value-wrapper")?.remove();
    submitBtnContainer.insertAdjacentHTML("beforebegin", inputTemplateString);

}

function inputValueHandler({target}) {
    if(!target.closest("#input-value-wrapper")) return;

    const inputGuideNode = target.nextElementSibling;

    if(target.value.length < 1) {
        inputGuideNode.innerHTML= "값을 입력하세요";
        toggleWarnMsg(inputGuideNode, "fail");
        
    } else {
        inputGuideNode.innerHTML= "&#x2705;";
        toggleWarnMsg(inputGuideNode, "pass");
    }

}

function on(problemSet) {
    $('#input-container').classList.remove("opacity-0");
    $('#input-container').addEventListener("input", inputValueHandler);
    $('#submit-btn').addEventListener('click', submitBtnClickHandler.bind(undefined, problemSet));
    $('#mission-code').addEventListener('input', missionCodeChangeHandler.bind(undefined, problemSet));
}

async function initializeService(problemSetURL) {
    const res = await fetch(problemSetURL);
    const _problemSet = await res.json();
    problemSet = _problemSet.body;
	on(problemSet);
}

//printMode
function 출력(result) {
    const resultViewer = $('#result-viewer');
    resultViewer.innerHTML = `<p>${result}</p>`;
}

(function() {
    const problemSetURL= 'https://08evkk06e1.execute-api.ap-northeast-2.amazonaws.com/default/codeTogetherMissionInfo';
	initializeService(problemSetURL);
})();