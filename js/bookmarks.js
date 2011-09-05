window.RecentBookmarks = function() {
	return {
		
		init : function() {
			chrome.bookmarks.getRecent(25, RecentBookmarks.parseRecent);
		},
		
		parseRecent : function(recentBookmarks) {
			$('#loading').remove();
			var ul = $('<ul></ul>').appendTo($('body')), date;
			for (var i=0, l=recentBookmarks.length; i<l; i++) {
				date = new Date(recentBookmarks[i].dateAdded);
				ul.append(
					$('<li></li>').html('<a href="' + recentBookmarks[i].url + '">' + recentBookmarks[i].title + '</a><br><small title="' + date.toISOString() + '">' + jQuery.timeago(date) + '</small>')
				);
			}
		}
		
	};
}();