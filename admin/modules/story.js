// =====================================
// STORY MODULE
// =====================================

function loadStory() {

  if (!websiteData.homepage) {
    websiteData.homepage = {};
  }

  if (!websiteData.homepage.story) {
    websiteData.homepage.story = {};
  }


  const story =
    websiteData.homepage.story;


  const badge =
    document.getElementById("storyBadge");

  const title =
    document.getElementById("storyTitle");

  const description =
    document.getElementById(
      "storyDescription"
    );

  const video =
    document.getElementById("storyImage");


  if (badge) {
    badge.value =
      story.badge || "";
  }

  if (title) {
    title.value =
      story.title || "";
  }

  if (description) {
    description.value =
      story.description || "";
  }

  if (video) {
    video.value =
      story.video || "";
  }

}


function collectStory() {

  if (!websiteData.homepage) {
    websiteData.homepage = {};
  }

  if (!websiteData.homepage.story) {
    websiteData.homepage.story = {};
  }


  const badge =
    document.getElementById("storyBadge");

  const title =
    document.getElementById("storyTitle");

  const description =
    document.getElementById(
      "storyDescription"
    );

  const video =
    document.getElementById("storyImage");


  if (badge) {
    websiteData.homepage.story.badge =
      badge.value;
  }

  if (title) {
    websiteData.homepage.story.title =
      title.value;
  }

  if (description) {
    websiteData.homepage.story.description =
      description.value;
  }

  if (video) {
    websiteData.homepage.story.video =
      video.value.trim();
  }

}


window.loadStory =
  loadStory;

window.collectStory =
  collectStory;