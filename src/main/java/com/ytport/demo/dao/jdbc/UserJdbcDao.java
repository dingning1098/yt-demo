package com.ytport.demo.dao.jdbc;


import com.ytport.base.dao.jdbc.JdbcDao;
import com.ytport.demo.entity.User;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.stereotype.Repository;
import org.springside.modules.orm.Page;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Collection;
import java.util.List;

/**
 * 资源 JdbcDao
 * Created by xyl on 15-3-23.
 */
@Repository("userJdbcDao")
public class UserJdbcDao extends JdbcDao<User, String> {

    /**
     * 不分页搜索用户信息
     *
     * @param filters
     * @return
     */
    public List<User> searchUser(Collection filters) {
        return this.search(userSql(), filters, new BeanPropertyRowMapper(User.class));
    }

    /**
     * 搜索用户信息
     *
     * @param filters
     * @return
     */
    public Page<User> searchUser(Page page, Collection filters) {
        return this.searchPage(page, userSql(), filters, new BeanPropertyRowMapper(User.class));
    }

	/**
     * 返回查询用户sql语句
     * @param isCrossApp 是否包括其他系统用户
     * @return
     */
    public static String userSql(boolean isCrossApp){
//        String sql = "SELECT ID,NAME,LOGIN_NAME,EMAIL,PWD,SALT,WORKER_CODE,STATE_FLAG,ADD_DATE,MODIFY_DATE,worker_nam as worker_info,NOTE,TEL" +
//                "            ,corp_code,corp_name  " +
//                "FROM (select ID,NAME,LOGIN_NAME,EMAIL,PWD,SALT,WORKER_CODE,STATE_FLAG,ADD_DATE,MODIFY_DATE,userInfo.NOTE,TEL, " +
//                "        ROLE_ID,ROLE_PROJECT_CODE,ROLE_CODE, RESOURCE_ID,RESOURCE_CODE,worker.worker_nam,corp.corp_cod as corp_code,corp.corp_nam as corp_name " +
//                "         from (SELECT ytgUser.ID,ytgUser.NAME,ytgUser.LOGIN_NAME,ytgUser.EMAIL,ytgUser.pwd,ytgUser.salt,  " +
//                "        ytgUser.WORKER_CODE,ytgUser.STATE_FLAG,ytgUser.ADD_DATE,ytgUser.MODIFY_DATE, ytgUser.note,ytgUser.tel," +
//                "        ytgRole.ID AS ROLE_ID,ytgRole.PROJECT_CODE AS ROLE_PROJECT_CODE,ytgRole.CODE AS ROLE_CODE,  " +
//                "        ytgResource.ID AS RESOURCE_ID,ytgResource.Code as resource_code " +
//                "          FROM YTG_USER ytgUser,  " +
//                "               YTG_USER_ROLE userRole,  " +
//                "               YTG_ROLE ytgRole,  " +
//                "               YTG_ROLE_RESOURCE roleResource,  " +
//                "               YTG_RESOURCE ytgResource  " +
//                "         WHERE     ytgUser.id = userRole.user_id(+)  " +
//                "               AND userRole.role_id = ytgRole.id(+)  " +
//                "               AND ytgRole.id = roleResource.role_id(+)  " +
//                "               AND ROLERESOURCE.RESOURCE_ID = ytgResource.id(+)) userInfo," +
//                "YTG_BASE_WORKER worker,YTG_BASE_DEPT dept,YTG_BASE_CORP corp " +
//                " where userInfo.WORKER_CODE=worker.worker_cod(+)" +
//                "       and worker.dept_cod=dept.dept_cod(+)" +
//                "       and dept.corp_cod=corp.corp_cod(+) ";
//
//
//
//        sql += " and {where}) group by ID,NAME,LOGIN_NAME,EMAIL,SALT,PWD,WORKER_CODE,STATE_FLAG,ADD_DATE,MODIFY_DATE,worker_nam,NOTE,TEL" +
//                ",corp_code,corp_name  " +
//                " order by corp_name asc";



        String sql = " SELECT ID,NAME,LOGIN_NAME,EMAIL,PWD,SALT,WORKER_CODE,STATE_FLAG,ADD_DATE,MODIFY_DATE,NOTE,TEL " +
                "                FROM (select ID,NAME,LOGIN_NAME,EMAIL,PWD,SALT,WORKER_CODE,STATE_FLAG,ADD_DATE,MODIFY_DATE,userInfo.NOTE,TEL,  " +
                "                        ROLE_ID,ROLE_PROJECT_CODE,ROLE_CODE, RESOURCE_ID,RESOURCE_CODE " +
                "                         from (SELECT ytgUser.ID,ytgUser.NAME,ytgUser.LOGIN_NAME,ytgUser.EMAIL,ytgUser.pwd,ytgUser.salt, " +
                "                        ytgUser.WORKER_CODE,ytgUser.STATE_FLAG,ytgUser.ADD_DATE,ytgUser.MODIFY_DATE, ytgUser.note,ytgUser.tel, " +
                "                        ytgRole.ID AS ROLE_ID,ytgRole.PROJECT_CODE AS ROLE_PROJECT_CODE,ytgRole.CODE AS ROLE_CODE,   " +
                "                        ytgResource.ID AS RESOURCE_ID,ytgResource.Code as resource_code  " +
                "                          FROM YTG_USER ytgUser,   " +
                "                               YTG_USER_ROLE userRole,   " +
                "                               YTG_ROLE ytgRole,   " +
                "                               YTG_ROLE_RESOURCE roleResource,  " +
                "                               YTG_RESOURCE ytgResource  " +
                "                         WHERE ytgUser.id = userRole.user_id(+)   " +
                "                           AND userRole.role_id = ytgRole.id(+)   " +
                "                           AND ytgRole.id = roleResource.role_id(+)   " +
                "                           AND roleResource.RESOURCE_ID = ytgResource.id(+) and {where} ) userInfo " +
                "                  ) group by ID,NAME,LOGIN_NAME,EMAIL,SALT,PWD,WORKER_CODE,STATE_FLAG,ADD_DATE,MODIFY_DATE,NOTE,TEL ";


        return sql;
    }

    public static String userSql() {
        return userSql(false);
    }

    public static User parseUser(ResultSet rs) throws SQLException {
        User user = new User();
        user.setId(rs.getString("ID"));
        user.setName(rs.getString("NAME"));
        user.setLoginName(rs.getString("LOGIN_NAME"));
        user.setEmail(rs.getString("EMAIL"));
        user.setWorkerCode(rs.getString("WORKER_CODE"));
//        user.setWorkerInfo(rs.getString("WORKER_INFO"));
        user.setStateFlag(rs.getInt("STATE_FLAG"));
        user.setAddDate(rs.getDate("ADD_DATE"));
        user.setModifyDate(rs.getDate("MODIFY_DATE"));
        user.setNote(rs.getString("NOTE"));
        user.setTel(rs.getString("TEL"));

        return user;
    }
}
