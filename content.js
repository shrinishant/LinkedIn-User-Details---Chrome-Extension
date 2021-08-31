var start = 0;
var end = 0;
var counter = start;

var about = [];
var followers = [];
var experience = [];
var profilename = [];

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        if (request.go == "true"){
            start = parseInt(request.start);
            end = parseInt(request.end);
            counter = start;

            just_start();
            sendResponse({farewell: "goodbye"});
        }

        return true;
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var main_search_results = document.getElementsByClassName('scaffold-layout__main');
var current_search_page = document.getElementsByClassName("artdeco-pagination__indicator--number active");
var search_pages = document.getElementsByClassName("artdeco-pagination__indicator--number");
var list_search_profiles = document.getElementsByClassName('reusable-search__entity-results-list');
var search_profiles = document.getElementsByClassName('entity-result__title-text');
var next_btn = document.getElementsByClassName('artdeco-pagination__button--next');

var profile_detail_section = document.getElementsByClassName('profile-detail');
var about_div = document.getElementsByClassName('pv-about-section');
var activity_div = document.getElementsByClassName('pv-recent-activity-section-v2');
var experience_div = document.getElementById('experience-section');

counter = start;

var just_start = async () => {

    window.scrollTo(0, document.body.scrollHeight);
    await sleep(1500);

    var current_search_page = document.getElementsByClassName("artdeco-pagination__indicator--number active");
    var search_pages = document.getElementsByClassName("artdeco-pagination__indicator--number");

    try{
        if(start !== parseInt(current_search_page[0].innerText)){
            for(let i = 0; i<search_pages.length; i++){
                if(start === parseInt(search_pages[i].innerText)){
                    search_pages[i].firstElementChild.click();
                }
            }
        }
        // else{
        //     console.log("Equals");
        // }
    }catch{}
    
    for(let s = 0; s<=(end - start); s++){
        await sleep(1000);

        window.scrollTo(0, document.body.scrollHeight);

        var main_search_results = document.getElementsByClassName('scaffold-layout__main');
        var current_search_page = document.getElementsByClassName("artdeco-pagination__indicator--number active");
        var search_pages = document.getElementsByClassName("artdeco-pagination__indicator--number");
        var list_search_profiles = document.getElementsByClassName('reusable-search__entity-results-list');
        var search_profiles = document.getElementsByClassName('entity-result__title-text');

        try {
            await sleep(1000);
            var list_search_profiles = document.getElementsByClassName('reusable-search__entity-results-list');
            var no_of_profiles = list_search_profiles[0].children.length;

        } catch (error) {
            var no_of_profiles = 10;
        }

        for(let i=0; i<no_of_profiles; i++){

            await sleep(1000);
            search_profiles[i].firstElementChild.click();
            // if(search_profiles[i].firstElementChild.innerText !== "LinkedIn Member"){
                
            // }

            var profile_detail_section = document.getElementsByClassName('profile-detail');
            var profile_name = document.getElementsByClassName('pv-text-details__left-panel');
            var featured_div = document.getElementsByClassName('pab-featured-section');
            var highlight_div = document.getElementsByClassName('pv-highlights-section');
            var about_div = document.getElementsByClassName('pv-about-section');

            await sleep(2500);
            var profile_name = document.getElementsByClassName('pv-text-details__left-panel');

            try {
                profilename.push(profile_name[0].firstElementChild.firstElementChild.innerText);
            } catch (error) {
                profilename.push("Sudeep");
            }

            try{
                about.push(about_div[0].children[1].innerText);
            }catch{
                about.push("Didn't have!");
            }

            if(featured_div[0] !== undefined){
                featured_div[0].scrollIntoView(true);
            }else if(highlight_div !== undefined){
                await sleep(1500);
                try {
                    var highlight_div = document.getElementsByClassName('pv-highlights-section');
                    highlight_div[0].scrollIntoView(true);

                    if(featured_div[0] !== undefined){
                        featured_div[0].scrollIntoView(true);
                    }
                } catch (error) {}
            }

            await sleep(2000);
            var activity_div = document.getElementsByClassName('pv-recent-activity-section-v2');
            try{
                followers.push(activity_div[0].children[1].innerText);
            }catch{
            }

            activity_div[0].scrollIntoView(true);
            await sleep(2000);
            var experience_div = document.getElementsByClassName('experience-section');
        
            try{
                var exp = experience_div[0].getElementsByClassName('pv-entity__summary-info');
                var exp_for_one = [];
                for(let x=0; x<exp.length; x++){
                    // exp_for_one.push(exp[x].firstElementChild.innerText);
                    exp_for_one.push(exp[x].children[2].innerText);
                }
                experience.push(exp_for_one);
            }catch{
                experience.push("Didn't have!");
            }

            window.history.back();
        }

        await sleep(2000);
        window.scrollTo(0, document.body.scrollHeight);
        var next_btn = document.getElementsByClassName('artdeco-pagination__button--next');

        if(s !== (end - start)){
            await sleep(1000);
            next_btn[0].click();
        }

        // if(counter < end){
        //     await sleep(1000);
        //     next_btn[0].click();
        // }
    }

    if(about.length > followers.length){
        var con_len = about.length;
    }else{
        var con_len = followers.length;
    }

    for(let i=0; i<con_len; i++){
        console.log(profilename[i]);
        console.log(about[i]);
        console.log(followers[i]);
        for(let z=0; z<experience[i].length; z++){
            console.log(experience[i][z]);
        }
        console.log("\n");
    }

    alert("Done");

}