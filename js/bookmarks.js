window.RecentBookmarks = function() {
	return {
		
		init : function() {
			chrome.bookmarks.getRecent(25, RecentBookmarks.parseRecent);
		},
		
		parseRecent : function(recentBookmarks) {
			$('#loading').remove();
			var ul = $('<ul></ul>').appendTo($('body')), date, html;
			for (var i=0, l=recentBookmarks.length; i<l; i++) {
				date = new Date(recentBookmarks[i].dateAdded);
				html = '<a href="' + recentBookmarks[i].url + '">' + recentBookmarks[i].title + '</a><br>';
				html += '<small class="date" title="' + date.toISOString() + '">' + jQuery.timeago(date) + '</small><br>';
				html += '<small class="location" id="location_' + recentBookmarks[i].id + '"></small>';
				$('<li></li>').html(html).appendTo(ul);
				RecentBookmarks.getLocation(recentBookmarks[i].id, recentBookmarks[i].parentId);
			}
		},
		
		getLocation : function(child_id, lookup_id) {
			chrome.bookmarks.get(lookup_id, function(bookmarks) {
				if (bookmarks.length > 0 && bookmarks[0].parentId) {
					var html = bookmarks[0].parentId != '0' ? ' &rarr; ' : '';
					//html += '<a href="chrome://bookmarks/#' + bookmarks[0].id + '">' + bookmarks[0].title + '</a>';
					html += bookmarks[0].title;
					html += $('#location_' + child_id).html();
					$('#location_' + child_id).html(html);
					RecentBookmarks.getLocation(child_id, bookmarks[0].parentId);
				}
			});
		}
		
	};
}();