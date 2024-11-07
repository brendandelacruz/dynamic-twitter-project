const users = {
    user1: {
        userName: '@elonmusk',
        displayName: 'Elon Musk',
        joinedDate: 'June 2009',
        followingCount: 103,
        followerCount: 47900000,
        avatarURL: 'assets/elonmusk.jpg',
        coverPhotoURL: 'assets/elonmusk-cover.jpeg',
        tweets: [
            { text: 'I admit to judging books by their cover', timestamp: '2/10/2021 00:01:20' },
            { text: 'Starship to the moon', timestamp: '2/09/2021 18:37:12' },
            { text: 'Out on launch pad, engine swap underway', timestamp: '2/09/2021 12:11:51' }
        ]
    },
    user2: {
        userName: '@BillGates',
        displayName: 'Bill Gates',
        joinedDate: 'June 2009',
        followingCount: 274,
        followerCount: 53800000,
        avatarURL: 'assets/billgates.jpg',
        coverPhotoURL: 'assets/billgates-cover.jpeg',
        tweets: [
            { text: 'Everybody asks, how is the next Windows coming along? But nobody asks how is Bill? :/', timestamp: '2/10/2021 00:01:20' },
            { text: 'Should I start tweeting memes? Let me know in a comment.', timestamp: '2/09/2021 18:37:12' },
            { text: 'In 2020, I read a book every hour.', timestamp: '2/09/2021 12:11:51' }
        ]
    }
};

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function loadUserProfile() {
    const userParam = getQueryParam("user"); // Get 'user' from URL query
    const user = users[userParam]; // Access the corresponding user object

    if (user) {
        displayUser(user);
    } else {
        console.error("User not found! Loading default profile.");
        displayUser(users.user1); // display user1 as default
    }
}
loadUserProfile();

function displayUser(user) {
    function formatFollowers(count) {
        if (count < 1000) {
          return count.toString();
        } else if (count < 1_000_000) {
          return (count / 1000).toFixed(1).replace(/\.0$/, "") + "K";
        } else {
          return (count / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M"; 
        }
    }
      
    let headerContainer = document.getElementsByClassName("header-container")[0];
    headerContainer.innerHTML = `
    <button class="back-btn">
        &#129104;
    </button>
    <div class="header-content">
        <div class="display-name-container">
            <h3 class="display-name">
                ${user.displayName}
            </h3>
            <img class="verified-icon" src="assets/check.png">
        </div>
        <p class="tweet-count light-color-font">
            ${user.tweets.length} Tweets
        </p>
    </div>
    `;

    let coverContainer = document.getElementsByClassName("cover-container")[0];
    coverContainer.innerHTML = `<img class="cover-image" src=${user.coverPhotoURL}>`;

    let profileContainer = document.getElementsByClassName("profile-container")[0];
    profileContainer.innerHTML = `
        <img class="profile-image" src=${user.avatarURL}>
        <button class="follow-btn is-following">
            Following
        </button>
        <div class="display-name-container">
            <h3 class="display-name">
                ${user.displayName}
            </h3>
            <img class="verified-icon" src="assets/check.png">
        </div>
        <p class="user-name light-color-font">
            ${user.userName}
        </p>
        <p class="joined-date light-color-font">
            <img class="calendar-icon" src="assets/calendar.png"> Joined ${user.joinedDate}
        </p>
        <div class="follow-count-container">
            <div class="following-container">
                <p class="follow-count">
                    ${formatFollowers(user.followingCount)}
                </p>
                <p class="light-color-font">
                    Following
                </p>
            </div>
            <div class="followers-container">
                <p class="follow-count">
                    ${formatFollowers(user.followerCount)}
                </p>
                <p class="light-color-font">
                    Followers
                </p>
            </div>
        </div>
    `;

    const followBtn = document.querySelector(".follow-btn");
    followBtn.style.cssText = "background-color: #00b3ff; color: white; padding: 8px 15px; border: none; border-radius: 500px; font-weight: 600;";
    followBtn.textContent = "Following";
    let isFollowing = false;
    followBtn.addEventListener("click", function() {
        if(isFollowing) {
            followBtn.style.cssText = "background-color: #00b3ff; color: white; padding: 8px 15px; border: none; border-radius: 500px; font-weight: 600;";
            followBtn.textContent = "Following";
            // toggle indicator to be false
            isFollowing = false;
          } else {
            followBtn.style.cssText = "background-color: black; color: white; padding: 8px 15px; border: none; border-radius: 500px; font-weight: 600;";
            followBtn.textContent = "Follow";
            // toggle indicator to be true
            isFollowing = true;
          }
    });

    let tweetsContainer = document.getElementsByClassName("tweets-container")[0];
    tweetsContainer.innerHTML = `
        <div class="tabs">
            <div id="tab1" class="tab active-tab light-color-font">
                Tweets
            </div>
            <div id="tab2" class="tab light-color-font">
                Tweets & replies
            </div>
            <div id="tab3" class="tab light-color-font">
                Media
            </div>
            <div id="tab4" class="tab light-color-font">
                Likes
            </div>
        </div>
    `;

    const tabs = document.querySelectorAll(".tab");
    tabs.forEach(tab => {
        tab.addEventListener("click", function() {
            // Remove active class from any currently active tab
            document.querySelector(".active-tab")?.classList.remove("active-tab");

            // Add active class to the clicked tab
            tab.classList.add("active-tab");
        });
    });

    let tweets = user.tweets;
    for(let tweet of tweets) {
        let myTweet = document.createElement("div");
        myTweet.classList.add("tweet");
        myTweet.innerHTML = `
            <img class="small-profile-image" src=${user.avatarURL}>
            <div class="tweet-content">
                <div class="tweet-user-info">
                <div class="display-name-container">
                    <h3 class="display-name">
                        ${user.displayName}
                    </h3>
                    <img class="verified-icon" src="assets/check.png">
                </div>
                <p class="user-name light-color-font">
                    ${user.userName}
                </p>
                <p class="light-color-font">
                    • ${timeAgo(tweet.timestamp)}
                </p>
                </div>
                <p>
                    ${tweet.text}
                </p>
            </div>
        `;

        function timeAgo(timestamp) {
            const now = new Date();
            const then = new Date(timestamp);
            const secondsAgo = Math.floor((now - then) / 1000);
            const minutesAgo = Math.floor(secondsAgo / 60);
            const hoursAgo = Math.floor(minutesAgo / 60);
            const daysAgo = Math.floor(hoursAgo / 24);
            const yearsAgo = Math.floor(daysAgo / 365);

            if (secondsAgo < 60) {
                return `${secondsAgo}s`;
            } else if (minutesAgo < 60) {
                return `${minutesAgo}m`;
            } else if (hoursAgo < 24) {
                return `${hoursAgo}h`;
            } else if (daysAgo < 365) {
                return `${daysAgo}d`;
            } else {
                return `${yearsAgo}yr`;
            }
        }
        tweetsContainer.appendChild(myTweet);
    }
}