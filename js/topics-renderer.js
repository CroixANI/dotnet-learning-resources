(function () {
  var TOPICS_NAVIGATION_SELECTOR = '#main-navigation';
  var TOPICS_CONTAINER_SELECTOR = '#topics-container';
  var TOPIC_SECTION_TEMPLATE_SELECTOR = '#topic-section';
  var TOPIC_RESOURCE_TEMPLATE_SELECTOR = '#topic-resource';
  var TOPIC_DIVIDER_TEMPLATE_SELECTOR = '#topic-divider';
  var TOPIC_SECTION_SELECTOR = '.resume-section';
  var TOPIC_TITLE_SELECTOR = '#topic-title';
  var TOPIC_SUB_TITLE_SELECTOR = '#topic-sub-title';
  var TOPIC_RESOURCE_LINK_SELECTOR = '#topic-resource-link';

  var topicsNavigationElement = document.querySelector(TOPICS_NAVIGATION_SELECTOR);
  var topicsContainerElement = document.querySelector(TOPICS_CONTAINER_SELECTOR);
  
  var topicsResourceCounter = 1;

  function createElementFromString (templateString) {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = templateString;
    return newElement.firstChild;
  }

  function renderNavigation(topics) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < topics.length; i++) {
      var topic = topics[i];
      fragment.appendChild(createElementFromString(`<li class="nav-item">
        <a class="nav-link js-scroll-trigger" href="#${topic.id}">${i+1}. ${topic.title}</a>
      </li>`));
    }
    
    topicsNavigationElement.appendChild(fragment);
  }

  function renderTopicResource(topicResourceTemplate, resource) {
    var resourceElement = topicResourceTemplate.cloneNode(true).querySelector('#topic-resource-container');
    var link = resourceElement.querySelector(TOPIC_RESOURCE_LINK_SELECTOR);
    if (!resource.url) {
      resourceElement.removeChild(link);
    }
    else {
      link.setAttribute('href', resource.url);
      link.innerText = `${topicsResourceCounter}) ${resource.title}`;
      topicsResourceCounter++;
    }

    if (resource.descriptionTemplate) {
      resourceElement.appendChild(createElementFromString(resource.descriptionTemplate));
    }

    return resourceElement;
  }

  function renderTopicResources(parent, topicResourceTemplate, resources) {
    var fragment = document.createDocumentFragment();
    
    for (var i = 0; i < resources.length; i++) {
      fragment.appendChild(renderTopicResource(topicResourceTemplate, resources[i]));
    }

    parent.after(fragment)
  }

  function renderTopic(topicTemplate, topicResourceTemplate, data) {
    var element = topicTemplate.cloneNode(true).querySelector(TOPIC_SECTION_SELECTOR);
    element.setAttribute('id', data.id);

    var titleElement = element.querySelector(TOPIC_TITLE_SELECTOR);
    titleElement.innerText = data.title;

    var subTitleElement = element.querySelector(TOPIC_SUB_TITLE_SELECTOR);
    subTitleElement.innerText = data.description;

    renderTopicResources(subTitleElement, topicResourceTemplate, data.resources);
    return element;
  }

  function renderTopics() {
    var topicTemplate = document.querySelector(TOPIC_SECTION_TEMPLATE_SELECTOR).content;
    var topicResourceTemplate = document.querySelector(TOPIC_RESOURCE_TEMPLATE_SELECTOR).content;
    var topicDividerTemplate = document.querySelector(TOPIC_DIVIDER_TEMPLATE_SELECTOR).content;
    var fragment = document.createDocumentFragment();
    
    var topics = window.data.getTopics();
    renderNavigation(topics);

    for (var i = 0; i < topics.length; i++) {
      fragment.appendChild(renderTopic(topicTemplate, topicResourceTemplate, topics[i]));
      var dividerElement = topicDividerTemplate.cloneNode(true).querySelector('hr');
      fragment.appendChild(dividerElement);
    }

    topicsContainerElement.appendChild(fragment);
  }

  window.topics = {};
  window.topics.renderTopics = renderTopics;
})();