// https://stackoverflow.com/questions/67392661/github-personal-authentication-token-not-working-for-github-api -- Source


function userInformationHTML(user) {
    return `
    <h2>${user.name}
        <span class="small-name">
            (@<a href="${user.html_user})" target=_blank">${user.login}</a>
        </span>
    </h2>
    <div class="gh-content">
        <div class="gh-avatar>
            <a href="${user.html_url} target="_blank">
                <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}"
            </a>
        </div>
        <p>Follwers: ${user.followers} - Following ${user.following} <br> Repos: ${user.public_repos}</p>
    </div>  `
};

function repoInformationHTML(repos) {
    if (repos.length == 0) {
        return `
        <div class="clearfix repo-list">No Repos!</div>`
    };
    let listItemsHTML = repos.map(function(repo) {
        return `
        <li>
            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
        </li>
          `
    });

    return `
    <div class="clearfix repo-list">
        <p>
            <strong>Repo List:</strong>
        </p>
        <ul>
            ${listItemsHTML.join("\n")}
        </ul>
    </div>`
};

function fetchGitHubInformation(event) {
    $("#gh-user-data").html("");
    $("#gh-repo-data").html("");
    let username = $("#gh-username").val();
    if (!username) {
        $("#gh-user-data").html(`<h2>Please enter a GitHub Username</h2>`);
        return;
    };

    $("#gh-user-data").html(
        `<div id="loader">
            <img src="assets/css/loader.gif" alt="loading...">
        </div>`
    );

    $.when(
        $.getJSON(`https://api.github.com/users/${username}`),
        $.getJSON(`https://api.github.com/users/${username}/repos`)
    ).then(
        function(firstResponse, secondResponse) {
            let userData = firstResponse[0];
            let repoData = secondResponse[0];
            $("#gh-user-data").html(userInformationHTML(userData));
            $("#gh-repo-data").html(repoInformationHTML(repoData));
        }, function(errorResponse) {
            if (errorResponse.status === 404) {
                $("#gh-user-data").html(`<h2> no info found for user ${username}</h2>`)
            } else if (errorResponse.status === 403) {
                let resetTime = new Date(errorResponse.getResponseHeader('X-RateLimit-Reset')*1000);
                $("#gh-user-data").html(`
                <h4>
                Too many requests, please wait until ${resetTime.toLocaleTimeString()}
                </h4>
                `)
            }
            else {
                console.log(errorResponse);
                $("#gh-user-data").html(`<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
            }
        }
    )
};

$(document).ready(fetchGitHubInformation);

// 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