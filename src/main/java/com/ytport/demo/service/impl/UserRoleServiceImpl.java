package com.ytport.demo.service.impl;

import com.ytport.base.service.impl.BaseServiceImpl;
import com.ytport.demo.dao.UserRoleDao;
import com.ytport.demo.dao.jdbc.UserRoleJdbcDao;
import com.ytport.demo.entity.UserRole;
import com.ytport.demo.service.UserRoleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springside.modules.orm.PropertyFilter;

import java.util.List;

@Component
@Transactional(readOnly = true)
public class UserRoleServiceImpl extends BaseServiceImpl<UserRole, String> implements UserRoleService {

    private static Logger logger = LoggerFactory.getLogger(UserRoleServiceImpl.class);

    @Autowired
    private UserRoleJdbcDao userRoleJdbcDao;

    private UserRoleDao baseDao;

    @Autowired
    public void setBaseDao(UserRoleDao value) {
        super.setBaseDao(value);
        baseDao = value;
    }

    @Override
    public String hql() {
        return "select entity from UserRole entity left join fetch entity.role role" +
                " left join fetch role.resources resource where {where}";
    }

    @Override
    public List<UserRole> search(List<PropertyFilter> filters) {

        String sql="select * from YTG_USER_ROLE entity ,YTG_ROLE ROLE WHERE entity.ROLE_ID=ROLE.ID AND {where}";
        return userRoleJdbcDao.search(sql,filters);
    }

    @Override
    @Transactional(readOnly = false)
    public void deleteUserRole(String userId) {
        baseDao.delete(userId);
    }


}

