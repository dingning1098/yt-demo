package com.ytport.demo.service.impl;


import com.ytport.base.service.impl.BaseServiceImpl;
import com.ytport.demo.dao.ResourceDao;
import com.ytport.demo.dao.RoleDao;
import com.ytport.demo.entity.Role;
import com.ytport.demo.entity.User;
import com.ytport.demo.service.RoleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springside.modules.orm.Page;
import org.springside.modules.orm.PropertyFilter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Component
@Transactional(readOnly = true)
public class RoleServiceImpl extends BaseServiceImpl<Role, String> implements RoleService {

    private static Logger logger = LoggerFactory.getLogger(RoleServiceImpl.class);

    private RoleDao baseDao;
    @Autowired
    private ResourceDao resourceDao;
    @Autowired
    private ResourceDao baseResourceDao;
    @Autowired
    private RoleDao baseRoleDao;

    @Autowired
    public void setBaseDao(RoleDao value) {
        super.setBaseDao(value);
        baseDao = value;
    }

    @Override
    public String hql() {
        return "select distinct entity from Role entity " +
                " left join entity.roleResources roleResource " +
                " left join roleResource.resource where {where} order by entity.code";
    }

    @Override
    @Transactional(readOnly = false)
    public boolean insert(Role role) {
//        role.setProjectCode(AppCfg.getAppCode());
        role.setAddDate(new Date());
        role.setModifyDate(new Date());
        baseRoleDao.save(role);
        return false;
    }

    @Override
    @Transactional(readOnly = false)
    public boolean update(Role role) {
        Role present = baseRoleDao.get(role.getId());
        BeanUtils.copyProperties(role, present, new String[]{"resources","projectCode"});
        role.setModifyDate(new Date());
        baseRoleDao.save(present);
        return false;
    }

    @Override
    public List<Role> searchCanAuthorizeRoles(User user) {
        List<PropertyFilter> filters=new ArrayList<PropertyFilter>();
        return this.search(filters);
    }

    @Override
    public List<Role> search(List<PropertyFilter> filters) {

        return super.search(filters);
    }

    @Override
    @Transactional(readOnly = true)
    public Page search(final Page page, final List<PropertyFilter> filters) {

        return super.search(page, filters);
    }
}

