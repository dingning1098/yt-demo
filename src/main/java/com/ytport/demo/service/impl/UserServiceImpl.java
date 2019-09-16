package com.ytport.demo.service.impl;



import com.ytport.base.service.ServiceEx;
import com.ytport.base.service.impl.BaseServiceImpl;
import com.ytport.demo.dao.*;
import com.ytport.demo.dao.jdbc.UserJdbcDao;
import com.ytport.demo.entity.*;
import com.ytport.demo.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.hibernate.Transaction;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springside.modules.orm.Page;
import org.springside.modules.orm.PropertyFilter;
import org.springside.modules.security.utils.Digests;
import org.springside.modules.utils.Encodes;

import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashSet;
import java.util.List;

@Component
@Transactional(readOnly = true)
public class UserServiceImpl extends BaseServiceImpl<User, String> implements UserService {

    public static final String HASH_ALGORITHM = "SHA-1";//加密算法
    public static final int HASH_INTERATIONS = 1024;//加密算法迭代次数
    private static final int SALT_SIZE = 8;//盐值长度

    private static Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    private UserDao baseDao;
    @Autowired
    private ResourceDao resourceDao;
    @Autowired
    private ResourceDao baseResourceDao;
    @Autowired
    private UserJdbcDao userJdbcDao;//直接连接Base库的
    @Autowired
    private UserDao baseUserDao;//需要对数据库执行写操作时，使用这个Dao
    @Autowired
    private UserRoleDao baseUserRoleDao;
    @Autowired
    private RoleDao baseRoleDao;
    @Autowired
    private RoleResourceDao baseRoleResourceDao;


    @Override
    public User get(String id) {
        return baseUserDao.get(id);
    }

    @Autowired
    public void setBaseDao(UserDao value) {
        super.setBaseDao(value);
        baseDao = value;
    }

    @Override
    public String hql() {
        return "select distinct entity from User entity" +
                " left join fetch entity.creator creator" +
                " left join fetch entity.worker worker" +
                " left join fetch worker.dept dept" +
                " left join fetch dept.corp corp " +
                " where {where} order by {order}";
    }

    @Override
    public List<Resource> searchUserMenus(User user) {
        /*List<Resource> result = resourceDao.find(
                "select distinct resource from User user left join user.roles role"
                        + " left join role.resources resource left join fetch resource.children resource2"
                        + " where resource.levelCode=2 and resource in elements(role.resources) and resource2 in elements(role.resources)"
                        + " and user.id=?"
                        + " and resource.projectCode=?"
                        + " order by resource.sort asc", user.getId(), ProjectCfg.getAppCode());*/
        //首先取出用户全部的资源
        List<Resource> result = resourceDao.find(
                "select distinct resource from User user left join user.userRoles userRole " +
                        " left join userRole.role role"
                        + " left join role.roleResources roleResource"
                        + " left join roleResource.resource resource"
                        + " where user.id=?"
                        + " and resource.typeFlag=0"
                        + " order by resource.levelCode,resource.sort asc", user.getId());
        //将用户具有的菜单资源组织成树结构
        List<Resource> treeResult=new ArrayList<Resource>();
        for(Resource each:result){
            if(each.getLevelCode()==2){
                Resource pojo=new Resource();
                BeanUtils.copyProperties(each,pojo,new String[]{"parent","children"});
                pojo.setChildren(null);
                treeResult.add(pojo);
            }else if(each.getLevelCode()==3){
                Resource parent=null;
                for(Resource eachTreeResult:treeResult){
                    if(eachTreeResult.getId().equals(each.getParentId()))
                        parent=eachTreeResult;
                }
                if(parent!=null) {
                    if(parent.getChildren()==null)
                        parent.setChildren(new LinkedHashSet<Resource>());
                    parent.getChildren().add(each);
                }
            }
        }

        return treeResult;
    }

    @Override
    public List<User> searchByRoleCode(String roleCode){
        List<PropertyFilter> filters=new ArrayList<PropertyFilter>();
        filters.add(new PropertyFilter("EQS_roleCode",roleCode));
        return userJdbcDao.searchUser(filters);
    }

    @Override
    @Transactional(readOnly = false)
    public void changePwd(User entity) {
        if(StringUtils.isEmpty(entity.getPlainPwd())){
            throw new ServiceEx("新密码不允许为空！");
        }
        if(!entity.getPlainPwd().equals(entity.getVerifyPlainPwd())){
            throw new ServiceEx("两次输入的密码不一致！");
        }

        User present=baseUserDao.get(entity.getId());
        present.setPlainPwd(entity.getPlainPwd());
        entryptPassword(present);
        baseUserDao.save(present);
    }

    @Override
    public User findByLoginName(String loginName) {
        User result=baseUserDao.findUnique("select entity from User entity " +
                " left join fetch entity.userRoles userRole " +
                " left join fetch userRole.role role " +
                " left join fetch role.roleResources roleResource " +
                " left join fetch roleResource.resource  where entity.loginName=?",loginName);
        //Hibernate.initialize(result.getRoles());

        return result;
    }

    @Override
    public Page searchUser(Page<User> page, List<PropertyFilter> filters) {
        return userJdbcDao.searchUser(page,filters);
    }

    @Override
    public List<User> searchUser(List<PropertyFilter> filters) {
        return userJdbcDao.searchUser(filters);
    }

    @Transactional(readOnly = false)
    public boolean insert(User entity) throws ServiceEx {
        if(!StringUtils.isEmpty(entity.getId())){
            throw new ServiceEx("新建用户时，ID必须为空！");
        }
        verifyLoginName(entity.getLoginName());

        if (StringUtils.isEmpty(entity.getPlainPwd()))
            throw new ServiceEx("初始密码不允许为空！");

        if(StringUtils.isNotEmpty(entity.getVerifyPlainPwd())){
            if(!entity.getVerifyPlainPwd().equals(entity.getPlainPwd())){
                throw new ServiceEx("两次输入的密码不一致！");
            }
        }

        entity.setAddDate(new Date());
        entity.setModifyDate(new Date());

        // 设定安全的密码，生成随机的salt并经过1024次 sha-1 hash
        if (StringUtils.isNotBlank(entity.getPlainPwd())) {
            entryptPassword(entity);
        }
        //默认状态标志为0
        entity.setStateFlag(0);
        Object present = SecurityUtils.getSubject().getPrincipal();
        if(present!=null&&present instanceof User)
            entity.setCreatorId(((User) present).getId());
        baseUserDao.save(entity);

//        //自动为新建的用户绑定到"大写项目代码_USER"这个角色下面
//        Role role=baseRoleDao.findUniqueBy("code", "OA" +"_USER");
//        if(role==null){
//            Resource projectResource=baseResourceDao.findUniqueBy("code", "OA");
//            if(projectResource==null)
//                throw new RuntimeException("找不到当前项目对应的基础资源！");
//
//            role=new Role();
//            role.setProjectCode("OA");
//            role.setCode("OA"+"_USER");
//            role.setName("OA" +"用户");
//            role.setNote("系统自动生成的"+ "OA" +"普通用户");
//            baseRoleDao.save(role);
//
//            RoleResource roleResource=new RoleResource();
//            roleResource.setResourceId(projectResource.getId());
//            roleResource.setRoleId(role.getId());
//            baseRoleResourceDao.save(roleResource);
//        }
//
//        UserRole userRole=new UserRole();
//        userRole.setUserId(entity.getId());
//        userRole.setRoleId(role.getId());
//        baseUserRoleDao.save(userRole);

        return false;
    }

    @Transactional(readOnly = false)
    @Override
    public boolean update(User entity) throws ServiceEx {
        User present=baseUserDao.get(entity.getId());
        if(!present.getLoginName().equals(entity.getLoginName()))
            verifyLoginName(entity.getLoginName());

        BeanUtils.copyProperties(entity,present,new String[]{"pwd","salt"});

        // 设定安全的密码，生成随机的salt并经过1024次 sha-1 hash
        if (StringUtils.isNotEmpty(entity.getPlainPwd())) {
            entryptPassword(present);
        }
        entity.setModifyDate(new Date());
        baseUserDao.save(present);
        return false;
    }

    @Override
    @Transactional(readOnly = false)
    public void save(User user) throws ServiceEx {
        if(StringUtils.isEmpty(user.getId())){
            this.insert(user);
        }else
            this.update(user);
    }

    private void verifyLoginName(String loginName){
        if(StringUtils.isEmpty(loginName))
            throw new ServiceEx("登录名不允许为空！");

        User isExistUser=baseUserDao.findUniqueBy("loginName",loginName);
        if(isExistUser!=null)
            throw new ServiceEx("相同用户名的用户已经存在！");
    }

    /**
     * 设定安全的密码，生成随机的salt并经过1024次 sha-1 hash
     */
    private void entryptPassword(User user) {

        /*if(StringUtils.isEmpty(user.getPlainPwd())||user.getPlainPwd().length()<6){
            throw new ServiceEx("密码不允许为空且长度要大于6");
        }*/

        byte[] salt = Digests.generateSalt(SALT_SIZE);
        user.setSalt(Encodes.encodeHex(salt));

        byte[] hashPassword = Digests.sha1(user.getPlainPwd().getBytes(), salt, HASH_INTERATIONS);
        user.setPwd(Encodes.encodeHex(hashPassword));
    }

    /**
     * 根据主键删除实例
     *
     * @param id
     * @return
     */
    @Transactional(readOnly = false)
    public void delete(String id) throws ServiceEx {
        Transaction tx=baseUserDao.getSession().beginTransaction();
        try{
//            baseUserRoleDao.deleteUserRole(id);
            baseUserDao.delete(id);
            //tx.commit();
        }catch (Exception ex){
            //tx.rollback();
            throw new ServiceEx(ex);
        }
    }

    @Override
    public Page search(Page page, List<PropertyFilter> filters) {
        return userJdbcDao.searchUser(page,filters);
    }
}

