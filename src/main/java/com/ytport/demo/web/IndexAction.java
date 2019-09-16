package com.ytport.demo.web;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.ytport.demo.entity.Resource;
import com.ytport.demo.entity.User;
import com.ytport.demo.service.UserService;
import com.ytport.util.AjaxUtil;
import com.ytport.util.SecurityUtil;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.interceptor.validation.SkipValidation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springside.modules.utils.web.struts2.Struts2Utils;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 * LoginController负责打开登录页面(GET请求)和登录出错页面(POST请求)，
 * <p/>
 * 真正登录的POST请求由Filter完成,
 *
 * @author xyl
 */
@Namespace(value = "/")
public class IndexAction extends ActionSupport {
	 private User user;
	    private List<Resource> menus;

	    @Autowired
	    private UserService userService;

	    @SkipValidation
	    public String execute() {
	        //生成用户所拥有的菜单
			User present = (User) SecurityUtil.getUser();
	        menus = userService.searchUserMenus(present);
	        return SUCCESS;
	    }
	   

	    public String menus() {
			User present = (User) SecurityUtil.getUser();
	        return AjaxUtil.ajaxJson(userService.searchUserMenus(present), AjaxUtil.Status.success, "");
	    }

	    public String login(){
			if (user == null
					|| StringUtils.isEmpty(user.getLoginName())
					|| StringUtils.isEmpty(user.getPwd()))
				return "login";

			HttpServletRequest request = Struts2Utils.getRequest();
			Subject subject = SecurityUtils.getSubject();
			if (!subject.isAuthenticated()) {
				try {
					UsernamePasswordToken token =
							new UsernamePasswordToken(user.getLoginName(), user.getPwd());
					subject.login(token);

					Map session= ActionContext.getContext().getSession();
					session.put("user.loginName",user.getLoginName());
					session.put("user.pwd",user.getPwd());
				} catch (Exception ae) {
					request.setAttribute("message", "用户名或密码错误！");
					return "login";
				}
			}
			User present = (User) SecurityUtil.getUser();
			menus = userService.searchUserMenus(present);
			return "loading";

	    }
	    //用户退出
	    public void logout() {
	    	Subject subject = SecurityUtils.getSubject();
	    	if (subject.isAuthenticated()) {
	    		subject.logout(); // session 会销毁，在SessionListener监听session销毁，清理权限缓存
	    		
	    	}
	    }
		public User getUser() {
			return user;
		}

		public void setUser(User user) {
			this.user = user;
		}

	    

	    
}
