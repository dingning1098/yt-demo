package com.ytport.demo.util;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DateTimeUtil {

	/**
	 * 获取当前时间
	 * 
	 * @return
	 */
	public static Timestamp getNow() {
		return new Timestamp(new Date().getTime());
	}

	/**
	 * 根据日期获取周起始、结束
	 * 
	 * @param date
	 * @return
	 */
	public static String[] getWeekFLDay(Date date) {
		String[] result = { null, null };
		DateFormat format = new SimpleDateFormat("yyyy-MM-dd");

		Calendar cal = Calendar.getInstance();
		// 设置预订日期
		cal.setTime(date);
		int is_sunday = cal.get(Calendar.DAY_OF_WEEK);

		if (is_sunday == 1) {
			int day_of_week = cal.get(Calendar.DAY_OF_WEEK) - 1;
			cal.add(Calendar.DATE, -day_of_week);

			result[1] = format.format(cal.getTime());// 周起始
			cal.add(Calendar.DATE, -6);
			result[0] = format.format(cal.getTime());// 周结束
		} else {
			int day_of_week = cal.get(Calendar.DAY_OF_WEEK) - 2;
			cal.add(Calendar.DATE, -day_of_week);

			result[0] = format.format(cal.getTime());// 周起始
			cal.add(Calendar.DATE, 6);
			result[1] = format.format(cal.getTime());// 周结束
		}

		return result;
	}

	/**
	 * 获得当前系统时间所在周的起始与结束
	 * 
	 * @return
	 */
	public static String[] getWeekFLDay() {
		String[] result = { null, null };
		DateFormat format = new SimpleDateFormat("yyyy-MM-dd");

		Calendar cal = Calendar.getInstance();

		int is_sunday = cal.get(Calendar.DAY_OF_WEEK);

		if (is_sunday == 1) {
			int day_of_week = cal.get(Calendar.DAY_OF_WEEK) - 1;
			cal.add(Calendar.DATE, -day_of_week);

			result[1] = format.format(cal.getTime());// 周起始
			cal.add(Calendar.DATE, -6);
			result[0] = format.format(cal.getTime());// 周结束
		} else {
			int day_of_week = cal.get(Calendar.DAY_OF_WEEK) - 2;
			cal.add(Calendar.DATE, -day_of_week);

			result[0] = format.format(cal.getTime());// 周起始
			cal.add(Calendar.DATE, 6);
			result[1] = format.format(cal.getTime());// 周结束
		}

		return result;
	}

	/**
	 * 根据日期获取该周在该年是第几周
	 * 
	 * @param date
	 * @return
	 */
	public static int getWeekNumberOfYear(Date date) {
		Calendar cal = Calendar.getInstance();
		// 设置预订日期
		cal.setTime(date);
		return cal.get(Calendar.WEEK_OF_YEAR);
	}

	/**
	 * 获取当前日期在该周在该年是第几周
	 * 
	 * @return
	 */
	public static int getWeekNumberOfYear() {
		Calendar cal = Calendar.getInstance();
		return cal.get(Calendar.WEEK_OF_YEAR);
	}

	/**
	 * 根据日期获取该周在该月是第几周
	 * 
	 * @param date
	 * @return
	 */
	public static int getWeekNumberOfMonth(Date date) {
		Calendar cal = Calendar.getInstance();
		// 设置预订日期
		cal.setTime(date);
		return cal.get(Calendar.WEEK_OF_MONTH);
	}

	/**
	 * 获取当前周是当前月的第几周
	 * 
	 * @return
	 */
	public static int getWeekNumberOfMonth() {
		Calendar cal = Calendar.getInstance();
		return cal.get(Calendar.WEEK_OF_MONTH);
	}

	/**
	 * 获当前时间的年月
	 * 
	 * @return
	 */
	public static String getYearMonth() {
		DateFormat format = new SimpleDateFormat("yyyyMM");
		Calendar cal = Calendar.getInstance();
		return format.format(cal.getTime());
	}

	/**
	 * 获得指定时间年月
	 * 
	 * @param date
	 * @return
	 */
	public static String getYearMonth(Date date) {
		DateFormat format = new SimpleDateFormat("yyyyMM");
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		return format.format(cal.getTime());
	}

	/**
	 * 获得指定时间年
	 * 
	 * @param date
	 * @return
	 */
	public static String getYear(Date date) {
		DateFormat format = new SimpleDateFormat("yyyy");
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		return format.format(cal.getTime());
	}

	public static String getYear() {
		DateFormat format = new SimpleDateFormat("yyyy");
		Calendar cal = Calendar.getInstance();
		return format.format(cal.getTime());
	}

	/**
	 * 按指定格式格式化日期
	 * 
	 * @param date
	 * @param pattern
	 * @return
	 */
	public static String fromtDate(Date date) {
		return fromtDate(date, "yyyy-MM-dd");
	}

	public static String fromtDateTime(Date date) {
		return fromtDate(date, "yyyy-MM-dd HH:mm");
	}

	public static String fromtDate(Date date, String pattern) {
		DateFormat format = new SimpleDateFormat(pattern);
		return format.format(date);
	}

	/**
	 * 获取季度起始值
	 * 
	 * @return
	 */
	public static String[] getSeasonFLDay() {
		String[] result = { null, null };
		String st = "";
		String ed = "";
		Calendar localTime = Calendar.getInstance();
		int x, y;
		x = localTime.get(Calendar.YEAR);
		y = localTime.get(Calendar.MONTH) + 1;
		/**
		 * 起始
		 */
		if (y >= 1 && y <= 3) {
			st = x + "-" + "01" + "-" + "01";
		}
		if (y >= 4 && y <= 6) {
			st = x + "-" + "04" + "-" + "01";
		}
		if (y >= 7 && y <= 9) {
			st = x + "-" + "07" + "-" + "01";
		}
		if (y >= 10 && y <= 12) {
			st = x + "-" + "10" + "-" + "01";
		}

		/**
		 * 结束
		 */
		if (y >= 1 && y <= 3) {
			ed = x + "-" + "03" + "-" + "31";
		}
		if (y >= 4 && y <= 6) {
			ed = x + "-" + "06" + "-" + "30";
		}
		if (y >= 7 && y <= 9) {
			ed = x + "-" + "09" + "-" + "30";
		}
		if (y >= 10 && y <= 12) {
			ed = x + "-" + "12" + "-" + "31";
		}

		result[0] = st;
		result[1] = ed;
		return result;
	}

	public static String[] getSeasonFLDay(Date date) {
		String[] result = { null, null };
		String st = "";
		String ed = "";
		Calendar localTime = Calendar.getInstance();
		// 设置预订日期
		localTime.setTime(date);
		int x, y;
		x = localTime.get(Calendar.YEAR);
		y = localTime.get(Calendar.MONTH) + 1;
		/**
		 * 起始
		 */
		if (y >= 1 && y <= 3) {
			st = x + "-" + "01" + "-" + "01";
		}
		if (y >= 4 && y <= 6) {
			st = x + "-" + "04" + "-" + "01";
		}
		if (y >= 7 && y <= 9) {
			st = x + "-" + "07" + "-" + "01";
		}
		if (y >= 10 && y <= 12) {
			st = x + "-" + "10" + "-" + "01";
		}

		/**
		 * 结束
		 */
		if (y >= 1 && y <= 3) {
			ed = x + "-" + "03" + "-" + "31";
		}
		if (y >= 4 && y <= 6) {
			ed = x + "-" + "06" + "-" + "30";
		}
		if (y >= 7 && y <= 9) {
			ed = x + "-" + "09" + "-" + "30";
		}
		if (y >= 10 && y <= 12) {
			ed = x + "-" + "12" + "-" + "31";
		}

		result[0] = st;
		result[1] = ed;
		return result;
	}

	public static String[] getYearFLDay() {
		String[] result = { null, null };
		String st = "";
		String ed = "";
		Calendar localTime = Calendar.getInstance();
		int x;
		x = localTime.get(Calendar.YEAR);
		/**
		 * 起始
		 */
		st = x + "-" + "01" + "-" + "01";
		/**
		 * 结束
		 */
		ed = x + "-" + "12" + "-" + "31";
		result[0] = st;
		result[1] = ed;
		return result;
	}

	public static String[] getYearFLDay(Date date) {
		String[] result = { null, null };
		String st = "";
		String ed = "";
		Calendar localTime = Calendar.getInstance();
		// 设置预订日期
		localTime.setTime(date);
		int x;
		x = localTime.get(Calendar.YEAR);
		/**
		 * 起始
		 */
		st = x + "-" + "01" + "-" + "01";
		/**
		 * 结束
		 */
		ed = x + "-" + "12" + "-" + "31";
		result[0] = st;
		result[1] = ed;
		return result;
	}

	public static int getSeason() {
		int season = 0;
		Calendar localTime = Calendar.getInstance();
		int y = localTime.get(Calendar.MONTH) + 1;// 当前月份
		if (y >= 1 && y <= 3) {
			season = 1;
		}
		if (y >= 4 && y <= 6) {
			season = 2;
		}
		if (y >= 7 && y <= 9) {
			season = 3;
		}
		if (y >= 10 && y <= 12) {
			season = 4;
		}
		return season;
	}

	public static int getSeason(Date date) {
		int season = 0;
		Calendar localTime = Calendar.getInstance();
		localTime.setTime(date);
		int y = localTime.get(Calendar.MONTH) + 1;// 当前月份
		if (y >= 1 && y <= 3) {
			season = 1;
		}
		if (y >= 4 && y <= 6) {
			season = 2;
		}
		if (y >= 7 && y <= 9) {
			season = 3;
		}
		if (y >= 10 && y <= 12) {
			season = 4;
		}
		return season;
	}

	/**
	 * 获得指定月数之前的日期
	 * 
	 * @param months
	 * @return
	 */
	public static Date beforeMonthDate(int months) {
		Calendar cal = Calendar.getInstance();
		int m = cal.get(Calendar.MONTH) - months;
		cal.set(Calendar.MONTH, m);
		return cal.getTime();
	}

	public static Date beforeMonthDate(Date date, int months) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		int m = cal.get(Calendar.MONTH) - months;
		cal.set(Calendar.MONTH, m);
		return cal.getTime();
	}

	public static Timestamp beforeMonthDate(Timestamp date, int months) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		int m = cal.get(Calendar.MONTH) - months;
		cal.set(Calendar.MONTH, m);
		return new Timestamp(cal.getTime().getTime());
	}

	/**
	 * 返回当前时间几个周前的日期
	 * 
	 * @param weeks
	 * @return
	 */
	public static Date beforeWeekDate(int weeks) {
		Calendar cal = Calendar.getInstance();
		int day = cal.get(Calendar.DATE) - weeks * 7;
		cal.set(Calendar.DATE, day);
		return cal.getTime();
	}

	/**
	 * 字符串转时间
	 * 
	 * @param timestampStr
	 * @param format
	 * @return
	 * @throws Exception
	 */
	public static Timestamp str2Timestamp(String timestampStr, String format) {
		if (timestampStr == null || timestampStr.trim().equals(" ")) {
			return null;
		}
		SimpleDateFormat dateFormat = new SimpleDateFormat(format);
		Date date = null;
		try {
			date = dateFormat.parse(timestampStr);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if (date != null)
			return new Timestamp(date.getTime());
		return null;
	}

	public static Date str2Date(String timestampStr, String format) {
		if (timestampStr == null || timestampStr.trim().equals(" ")) {
			return null;
		}
		SimpleDateFormat dateFormat = new SimpleDateFormat(format);
		Date date = null;
		try {
			date = dateFormat.parse(timestampStr);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return date;
	}
	
	/**
	 * 两个时间比较月份比较
	 * 
	 * @param st
	 * @param et
	 * @return
	 */
	public static int compareMonth(Timestamp st, Timestamp et) {
		Calendar calSt = Calendar.getInstance();
		Calendar calEt = Calendar.getInstance();
		calSt.setTime(st);
		calEt.setTime(et);
		int result = 0;
		while (!calSt.after(calEt)) {
			calSt.add(Calendar.MONTH, 1);
			result++;
		}
		return result;
	}

	/**
	 * 得到本月的第一天
	 * 
	 * @return
	 */
	public static String getMonthFirstDay() {
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.DAY_OF_MONTH,
				calendar.getActualMinimum(Calendar.DAY_OF_MONTH));

		return DateTimeUtil.fromtDate(calendar.getTime(), "yyyy-MM-dd");
	}

	public static String getMonthFirstDay(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.set(Calendar.DAY_OF_MONTH,
				calendar.getActualMinimum(Calendar.DAY_OF_MONTH));

		return DateTimeUtil.fromtDate(calendar.getTime(), "yyyy-MM-dd");
	}

	public static String getMonthFirstDay(Date date, String format) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.set(Calendar.DAY_OF_MONTH,
				calendar.getActualMinimum(Calendar.DAY_OF_MONTH));

		return DateTimeUtil.fromtDate(calendar.getTime(), format);
	}

	/**
	 * 得到本月的最后一天
	 * 
	 * @return
	 */
	public static String getMonthLastDay() {
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.DAY_OF_MONTH,
				calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
		return DateTimeUtil.fromtDate(calendar.getTime(), "yyyy-MM-dd");
	}

	public static String getMonthLastDay(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.set(Calendar.DAY_OF_MONTH,
				calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
		return DateTimeUtil.fromtDate(calendar.getTime(), "yyyy-MM-dd");
	}

	public static String getMonthLastDay(Date date, String format) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.set(Calendar.DAY_OF_MONTH,
				calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
		return DateTimeUtil.fromtDate(calendar.getTime(), format);
	}

	public static void main(String[] args) throws ParseException {
		String[] result = null;

		DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		Date dte = format.parse("2012-05-01");

		System.out.println(DateTimeUtil.getWeekNumberOfMonth(dte));
		Date dt = DateTimeUtil.str2Timestamp("2012-02-10", "yyyy-MM-dd");
		Date d = beforeMonthDate(dt, 1);
		System.out.println(format.format(d));

		Timestamp st, et;
		st = DateTimeUtil.str2Timestamp("2012-12-10", "yyyy-MM-dd");
		et = DateTimeUtil.str2Timestamp("2013-01-10", "yyyy-MM-dd");
		int c = compareMonth(st, et);
		System.out.println("c=" + c);

		Date dt1 = DateTimeUtil.beforeMonthDate(2);
		System.out.println(format.format(dt1));

		System.out.println(DateTimeUtil.getMonthFirstDay(new Date()));

		Timestamp s = DateTimeUtil.str2Timestamp(
				DateTimeUtil.getMonthLastDay(new Date()), "yyyy-MM-dd");
		System.out.println(s);

	}

}
