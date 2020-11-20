(function () {
    var NAVIGATION_SELECTOR = '#main-navigation';
    var QUESTIONS_GROUPS_CONTAINER_SELECTOR = '#questions-groups-container';
    var QUESTION_GROUP_SECTION_TEMPLATE_SELECTOR = '#question-group-section';
    var QUESTION_TEMPLATE_SELECTOR = '#question-template';
    var DIVIDER_TEMPLATE_SELECTOR = '#question-group-divider';
    var TOPIC_SECTION_SELECTOR = '.resume-section';
    var QUESTIONS_GROUP_TITLE_SELECTOR = '#question-group-title';

    var topicsNavigationElement = document.querySelector(NAVIGATION_SELECTOR);
    var topicsContainerElement = document.querySelector(QUESTIONS_GROUPS_CONTAINER_SELECTOR);

    function createElementFromString(templateString) {
        const newElement = document.createElement(`div`);
        newElement.innerHTML = templateString;
        return newElement.firstChild;
    }

    function renderNavigation(groups) {
        var fragment = document.createDocumentFragment();

        for (var i = 0; i < groups.length; i++) {
            var questionsGroup = groups[i];
            fragment.appendChild(createElementFromString(`<li class="nav-item">
            <a class="nav-link js-scroll-trigger" href="#${questionsGroup.id}">${i+1}. ${questionsGroup.title}</a>
          </li>`));
        }

        topicsNavigationElement.appendChild(fragment);
    }

    function renderQuestions(parent, questionTemplate, questionsData) {
        var fragment = document.createDocumentFragment();

        for (var i = 0; i < questionsData.length; i++) {
            var question = questionsData[i];
            var detailsElement = questionTemplate.cloneNode(true).querySelector(`details`);
            var summaryElement = detailsElement.querySelector(`summary`);
            summaryElement.innerText = question.title;
            var listElement = detailsElement.querySelector(`ul`);
            for(var j = 0; j < question.links.length; j++) {
                var link = question.links[j];
                listElement.appendChild(createElementFromString(
                    `<li>
                        <a href="${link.url}" target="_blank">${link.title}</a>
                    </li>`));
            }
            fragment.appendChild(detailsElement);
        }
        
        parent.after(fragment);
    }

    function renderQuestionGroup(groupTemplate, questionTemplate, questionsGroupsData) {
        var element = groupTemplate.cloneNode(true).querySelector(TOPIC_SECTION_SELECTOR);
        element.setAttribute('id', questionsGroupsData.id);
    
        var titleElement = element.querySelector(QUESTIONS_GROUP_TITLE_SELECTOR);
        titleElement.innerText = questionsGroupsData.title;
        
        renderQuestions(element.querySelector(`h3`), questionTemplate, questionsGroupsData.questions);
        return element;
      }

    function renderQuestionsGroups() {
        var questionGroupTemplate = document.querySelector(QUESTION_GROUP_SECTION_TEMPLATE_SELECTOR).content;
        var questionTemplate = document.querySelector(QUESTION_TEMPLATE_SELECTOR).content;
        var dividerTemplate = document.querySelector(DIVIDER_TEMPLATE_SELECTOR).content;
        var fragment = document.createDocumentFragment();

        var groups = window.data.getQuestionsGroups();
        renderNavigation(groups);

        for (var i = 0; i < groups.length; i++) {
            fragment.appendChild(renderQuestionGroup(questionGroupTemplate, questionTemplate, groups[i]));
            var dividerElement = dividerTemplate.cloneNode(true).querySelector('hr');
            fragment.appendChild(dividerElement);
        }
    
        topicsContainerElement.appendChild(fragment);
    }

    window.questions = {};
    window.questions.renderQuestionsGroups = renderQuestionsGroups;
})();