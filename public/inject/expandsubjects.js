
function expand(subjects,doneLoading) {
    if (!subjects.length){
        doneLoading({});
        return false;
    }
    var timeouts = [];
    var subjectsattr = {}
    function waitForElement(elementPath, parentElement, callBack) {
        timeouts.push(parentElement);
        window
            .setTimeout(function () {
                if (!$('#'+parentElement).hasClass('loading')) {
                    callBack(elementPath, $(elementPath));
                    console.log('taking out '+parentElement);
                    timeouts = remove(timeouts,parentElement);
                    $( "#subjectselector").trigger( "timeouts", [timeouts] );
                    if ((timeouts.length) === 0){
                        doneLoading(subjectsattr);
                    }
                } else {
                    waitForElement(elementPath, parentElement, callBack);
                }
            }, 50)
    }
    function expandall(expandablebranch) {
        if ($("#" + expandablebranch).attr("aria-expanded") === 'false') {
            $("#" + expandablebranch).trigger("click")
            waitForElement('#' + expandablebranch + '_group', expandablebranch, function () {
                collapse(expandablebranch);
                $('#' + expandablebranch + '_group')
                    .find('.tree_item')
                    .each(function (i) {
                        expandall($(this).attr("id"));
                    });
            });
        }
    }
    function collapse(expandablebranch) {
        if ($("#" + expandablebranch).attr("aria-expanded") === 'true') {
            $("#" + expandablebranch).trigger("click")
        }
    }

    function createUserInputtedElements(subjects){
        console.log(subjects)
        subjects.forEach(function(courseId){
            if (/^[0-9]{1,5}$/.test(courseId)) {
                navigation.find('li').last().before('<li class="type_course depth_3 contains_branch" aria-labelledby="label_3_15" tabindex="-1">'+
                    '<p class="tree_item branch" role="treeitem" id="expandable_branch_20_'+courseId+'" aria-expanded="false" data-requires-ajax="true" data-loaded="false" data-node-id="expandable_branch_20_'+courseId+'" data-node-key="'+courseId+'" data-node-type="20" tabindex="-1" aria-selected="false">'+
                        '<a tabindex="-1" id="label_3_15" title="'+courseId+'" href="https://lms.monash.edu/course/view.php?id='+courseId+'">'+courseId+'</a>'+
                    '</p>'+
                '</li>')
            }
        })
    }

    createUserInputtedElements(subjects);
    //refresh links
    navigationLinks = $(navigationLinksSelector);
    navigationLinks.each(function () {
        if ($(this).attr('title') != null && subjects.indexOf($(this).attr('title')) >= 0) {
            console.log('matching subject found');
            console.log(this);
            var expBranch = $(this)
                .parent()
                .attr('id');
            subjectattr = {}
            subjectattr.id = expBranch;
            subjectattr.dateCreated = new Date().getTime();
            subjectattr.expandedname = $(this).attr('title');
            subjectattr.name = $(this).attr('title').substring(0, 7);
            subjectsattr[$(this).attr('title')] = (subjectattr);
            subjectsattr['sesskey'] = $("input[name='sesskey']").first().val();
            expandall(expBranch);
        }
    });
}