
<%
	String userAgent = request.getHeader("User-Agent");
	//System.out.println(userAgent);
	//手机访问
	if (isMObile(userAgent)) {
		response.sendRedirect("/mobile/index.html");
	} else {
		response.sendRedirect("/pc/index.html");
	}
%>
<%!boolean isMObile(String agent) {
		if (agent == null || agent.length() == 0)
			return true;

		String[] keywords = { "Android", "iPhone", "iPod", "iPad",
				"Windows Phone", "MQQBrowser" };

		for (String item : keywords) {
			if (agent.contains(item)) {
				return true;
			}
		}

		return false;
	}%>