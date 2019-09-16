package com.ytport.demo.service.impl;

import com.ytport.demo.dao.UserDao;
import com.ytport.demo.entity.*;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springside.modules.utils.Encodes;

import javax.annotation.PostConstruct;

@Component
@Transactional
public class ShiroDbRealm extends AuthorizingRealm {

    @javax.annotation.Resource(name = "userDao")
    private UserDao userDao;

    /**
     * 认证回调函数,登录时调用.
     */
    @Override
    @Transactional(readOnly = false)
    protected AuthenticationInfo doGetAuthenticationInfo(
            AuthenticationToken authcToken) throws AuthenticationException {
        UsernamePasswordToken token = (UsernamePasswordToken) authcToken;

        System.out.println(token.getUsername());
        if(StringUtils.isEmpty(token.getUsername())){
            return null;
        }

        User user = userDao.findUnique("from User user" +
                " left join fetch user.userRoles userRole" +
                " left join fetch userRole.role role" +
                " left join fetch role.roleResources roleResource" +
                " left join fetch roleResource.resource" +
                " where user.loginName=?", token.getUsername());
        if (user != null) {
            if (!new Integer(0).equals(user.getStateFlag())) {
                //帐号被禁用了
                throw new DisabledAccountException();
            }
            byte[] salt = Encodes.decodeHex(user.getSalt());

            return new SimpleAuthenticationInfo(user, user.getPwd(),
                    ByteSource.Util.bytes(salt), getName());
        } else {
            return null;
        }
    }

    /**
     * 授权查询回调函数, 进行鉴权但缓存中无用户的授权信息时调用.
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(
            PrincipalCollection principals) {
        if(principals.getPrimaryPrincipal() instanceof User) {
            User user = (User) principals.getPrimaryPrincipal();

            SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
            for (UserRole userRole : user.getUserRoles()) {
                Role role=userRole.getRole();
                // 基于Role的权限信息
                info.addRole(role.getCode());
                // 基于Permission的权限信息
                for (RoleResource roleResource : role.getRoleResources()) {
                    Resource each=roleResource.getResource();
                    if (each.getTypeFlag() != null
                            && each.getTypeFlag() == 1
                            &&StringUtils.isNotEmpty(each.getCode()))
                        info.addStringPermission(each.getCode());
                }
            }
            return info;
        }else
            return null;
    }

    /**
     * 设定Password校验的Hash算法与迭代次数.
     */
    @PostConstruct
    public void initCredentialsMatcher() {
        HashedCredentialsMatcher matcher = new HashedCredentialsMatcher(
                UserServiceImpl.HASH_ALGORITHM);
        matcher.setHashIterations(UserServiceImpl.HASH_INTERATIONS);
        setCredentialsMatcher(matcher);
    }
}
