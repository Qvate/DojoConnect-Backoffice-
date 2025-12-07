import { mysqlTable, mysqlSchema, AnyMySqlColumn, unique, int, varchar, timestamp, datetime, text, index, date, mysqlEnum, decimal, time, tinyint } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const admin = mysqlTable("admin", {
	id: int().autoincrement().notNull(),
	firstName: varchar("first_name", { length: 100 }).notNull(),
	lastName: varchar("last_name", { length: 100 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	password: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()'),
},
(table) => [
	unique("email").on(table.email),
]);

export const adminPasswordResets = mysqlTable("admin_password_resets", {
	id: int().autoincrement().notNull(),
	adminEmail: varchar("admin_email", { length: 255 }).notNull(),
	otp: varchar({ length: 6 }).notNull(),
	expiresAt: datetime("expires_at", { mode: 'string'}).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
});

export const announcements = mysqlTable("announcements", {
	id: int().autoincrement().notNull(),
	title: varchar({ length: 255 }).notNull(),
	message: text().notNull(),
	senderEmail: varchar("sender_email", { length: 255 }).notNull(),
	urgency: varchar({ length: 50 }).default('Update'),
	createdAt: datetime("created_at", { mode: 'string'}).notNull(),
});

export const announcementRecipients = mysqlTable("announcement_recipients", {
	id: int().autoincrement().notNull(),
	announcementId: int("announcement_id").notNull(),
	recipientEmail: varchar("recipient_email", { length: 255 }).notNull(),
},
(table) => [
	index("announcement_id").on(table.announcementId),
]);

export const attendanceRecords = mysqlTable("attendance_records", {
	id: int().autoincrement().notNull(),
	classId: varchar("class_id", { length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	attendanceDate: date("attendance_date", { mode: 'string' }).notNull(),
	status: mysqlEnum(['Present','Absent','Late']).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
});

export const broadcastRecipients = mysqlTable("broadcast_recipients", {
	id: int().autoincrement().notNull(),
	messageId: int("message_id").notNull(),
	recipientId: int("recipient_id").notNull(),
},
(table) => [
	index("message_id").on(table.messageId),
	index("recipient_id").on(table.recipientId),
]);

export const chats = mysqlTable("chats", {
	id: int().autoincrement().notNull(),
	type: mysqlEnum(['dm','group','broadcast']).notNull(),
	name: varchar({ length: 100 }),
	createdBy: int("created_by"),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
},
(table) => [
	index("created_by").on(table.createdBy),
]);

export const chatParticipants = mysqlTable("chat_participants", {
	id: int().autoincrement().notNull(),
	chatId: int("chat_id").notNull(),
	userId: int("user_id").notNull(),
},
(table) => [
	index("user_id").on(table.userId),
	index("idx_chat_participants").on(table.chatId, table.userId),
]);

export const childrenSubscription = mysqlTable("children_subscription", {
	id: int().autoincrement().notNull(),
	childId: int("child_id").notNull(),
	enrollmentId: varchar("enrollment_id", { length: 50 }).notNull(),
	stripeSubscriptionId: varchar("stripe_subscription_id", { length: 255 }).default('NULL'),
	stripeCustomerId: varchar("stripe_customer_id", { length: 255 }).notNull(),
	status: mysqlEnum(['active','cancelled','paused']).default('active'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	stripeSessionId: varchar("stripe_session_id", { length: 255 }).default('NULL'),
});

export const classes = mysqlTable(
  "classes",
  {
    id: int().autoincrement().notNull(),
    classUid: varchar("class_uid", { length: 50 }).notNull(),
    ownerEmail: varchar("owner_email", { length: 255 }).notNull(),
    className: varchar("class_name", { length: 255 }).notNull(),
    description: text(),
    instructor: varchar({ length: 255 }),
    level: mysqlEnum(["Beginner", "Intermediate", "Advanced"]),
    ageGroup: varchar("age_group", { length: 50 }),
    frequency: varchar({ length: 50 }),
    capacity: int(),
    location: varchar({ length: 255 }),
    streetAddress: varchar("street_address", { length: 255 }),
    city: varchar({ length: 255 }),
    status: mysqlEnum(["active", "deleted", "hide"]).default("active"),
    createdAt: timestamp("created_at", { mode: "string" })
      .default("current_timestamp()")
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .default("current_timestamp()")
      .notNull(),
    imagePath: varchar("image_path", { length: 255 }),
    subscription: varchar({ length: 100 }),
    price: decimal({ precision: 10, scale: 2 }).default("0.00"),
    chatId: int("chat_id"),
    stripePriceId: varchar("stripe_price_id", { length: 255 }),
    stripeProductId: varchar("stripe_product_id", { length: 255 }).notNull(),
  },
  (table) => [unique("class_uid").on(table.classUid)]
);

export const classSchedule = mysqlTable("class_schedule", {
	id: int().autoincrement().notNull(),
	classId: int("class_id").notNull(),
	day: varchar({ length: 20 }).default('NULL'),
	startTime: time("start_time").notNull(),
	endTime: time("end_time").notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	scheduleDate: date("schedule_date", { mode: 'string' }).default('NULL'),
},
(table) => [
	index("class_id").on(table.classId),
]);

export const deletionRequests = mysqlTable("deletion_requests", {
	id: int().autoincrement().notNull(),
	title: varchar({ length: 50 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	reason: text().default('NULL'),
	status: mysqlEnum(['pending','approved','rejected']).default('pending'),
	requestedAt: timestamp("requested_at", { mode: 'string' }).default('current_timestamp()').notNull(),
});

export const dojos = mysqlTable("dojos", {
	id: int().autoincrement().notNull(),
	userEmail: varchar("user_email", { length: 150 }).notNull(),
	dojoName: varchar("dojo_name", { length: 255 }).notNull(),
	dojoTag: varchar("dojo_tag", { length: 50 }).notNull(),
	dojoTagline: varchar("dojo_tagline", { length: 255 }).default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
},
(table) => [
	unique("tag").on(table.dojoTag),
]);

export const enrolledChildren = mysqlTable("enrolled_children", {
	id: int().autoincrement().notNull(),
	enrollmentId: varchar("enrollment_id", { length: 50 }).notNull(),
	childName: varchar("child_name", { length: 100 }).notNull(),
	childEmail: varchar("child_email", { length: 100 }).notNull(),
	experienceLevel: varchar("experience_level", { length: 50 }).notNull(),
},
(table) => [
	index("enrollment_id").on(table.enrollmentId),
]);

export const enrollments = mysqlTable("enrollments", {
	id: int().autoincrement().notNull(),
	enrollmentId: varchar("enrollment_id", { length: 50 }).notNull(),
	classId: varchar("class_id", { length: 50 }).notNull(),
	parentEmail: varchar("parent_email", { length: 100 }).notNull(),
	createdAt: datetime("created_at", { mode: 'string'}).default('current_timestamp()'),
},
(table) => [
	unique("enrollment_id").on(table.enrollmentId),
]);

export const events = mysqlTable("events", {
	id: int().autoincrement().notNull(),
	title: varchar({ length: 255 }).notNull(),
	description: text().default('NULL'),
	classIds: text("class_ids").notNull(),
	visibility: text().notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	eventDate: date("event_date", { mode: 'string' }).notNull(),
	startTime: varchar("start_time", { length: 20 }).notNull(),
	endTime: varchar("end_time", { length: 20 }).notNull(),
	notificationValue: int("notification_value").default(0),
	notificationUnit: varchar("notification_unit", { length: 20 }).default('NULL'),
	location: varchar({ length: 255 }).default('NULL'),
	link: varchar({ length: 255 }).notNull(),
	createdBy: varchar("created_by", { length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	notificationSent: tinyint("notification_sent").default(0),
	responseStatus: varchar("response_status", { length: 121 }).default('pending').notNull(),
});

export const feedback = mysqlTable("feedback", {
	id: int().autoincrement().notNull(),
	userEmail: varchar("user_email", { length: 255 }).default('NULL'),
	message: text().default('NULL'),
	fullName: varchar("full_name", { length: 255 }).default('NULL'),
	role: varchar({ length: 100 }).default('NULL'),
	submittedAt: timestamp("submitted_at", { mode: 'string' }).default('current_timestamp()').notNull(),
});

export const instructorsTbl = mysqlTable("instructors_tbl", {
	id: int().autoincrement().notNull(),
	instructorFirstName: varchar("instructor_first_name", { length: 50 }).default('NULL'),
	instructorLastName: varchar("instructor_last_name", { length: 50 }).default('NULL'),
	instructorEmail: varchar("instructor_email", { length: 100 }).default('NULL'),
	invitedBy: varchar("invited_by", { length: 121 }).notNull(),
	class: varchar({ length: 100 }).default('NULL'),
	status: varchar({ length: 121 }).default('pending').notNull(),
});

export const messages = mysqlTable("messages", {
	id: int().autoincrement().notNull(),
	chatId: int("chat_id").notNull(),
	senderId: int("sender_id").notNull(),
	message: text().notNull(),
	createdAt: datetime("created_at", { mode: 'string'}).default('current_timestamp()').notNull(),
},
(table) => [
	index("idx_messages_chat_id").on(table.chatId),
	index("idx_messages_sender_id").on(table.senderId),
]);

export const notifications = mysqlTable("notifications", {
	id: int().autoincrement().notNull(),
	userEmail: varchar("user_email", { length: 255 }).default('NULL'),
	title: varchar({ length: 255 }).default('NULL'),
	message: text().default('NULL'),
	isRead: tinyint("is_read").default(0),
	createdAt: datetime("created_at", { mode: 'string'}).default('current_timestamp()'),
	type: varchar({ length: 50 }).default('NULL'),
	eventId: varchar("event_id", { length: 121 }).default('NULL'),
	acceptDecline: varchar("accept_decline", { length: 20 }).default('NULL'),
	status: varchar({ length: 20 }).default('pending'),
});

export const parents = mysqlTable("parents", {
	id: int().autoincrement().notNull(),
	email: varchar({ length: 255 }).notNull(),
	enrollmentId: varchar("enrollment_id", { length: 255 }).default(''),
	classId: varchar("class_id", { length: 255 }).default(''),
},
(table) => [
	unique("unique_parent_enrollment").on(table.email, table.enrollmentId, table.classId),
]);

export const passwordResets = mysqlTable("password_resets", {
	email: varchar({ length: 255 }).notNull(),
	token: varchar({ length: 64 }).notNull(),
	expiresAt: datetime("expires_at", { mode: 'string'}).notNull(),
});

export const sessions = mysqlTable("sessions", {
	sessionId: varchar("session_id", { length: 255 }).notNull(),
	userEmail: varchar("user_email", { length: 255 }).notNull(),
	userIp: varchar("user_ip", { length: 50 }).default('NULL'),
	userAgent: text("user_agent").default('NULL'),
	createdAt: datetime("created_at", { mode: 'string'}).default('current_timestamp()'),
	expiresAt: datetime("expires_at", { mode: 'string'}).notNull(),
},
(table) => [
	index("user_email").on(table.userEmail),
]);

export const students = mysqlTable("students", {
	id: int().autoincrement().notNull(),
	fullName: varchar("full_name", { length: 255 }).default('NULL'),
	email: varchar({ length: 255 }).default('NULL'),
	classId: varchar("class_id", { length: 255 }).default('NULL'),
	addedBy: varchar("added_by", { length: 255 }).default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
},
(table) => [
	unique("email").on(table.email),
]);

export const tasks = mysqlTable("tasks", {
	id: int().autoincrement().notNull(),
	title: varchar({ length: 255 }).default('NULL'),
	description: text().default('NULL'),
	assignedTo: varchar("assigned_to", { length: 255 }).default('NULL'),
	createdBy: varchar("created_by", { length: 255 }).default('NULL'),
	dueDate: datetime("due_date", { mode: 'string'}).default('NULL'),
	notificationValue: varchar("notification_value", { length: 10 }).default('NULL'),
	notificationUnit: varchar("notification_unit", { length: 10 }).default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	status: mysqlEnum(['pending','in_progress','completed','declined']).default('pending'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('NULL'),
});

export const transactions = mysqlTable("transactions", {
	id: int().autoincrement().notNull(),
	userEmail: varchar("user_email", { length: 255 }).notNull(),
	transactionTitle: varchar("transaction_title", { length: 255 }).notNull(),
	revenue: decimal({ precision: 10, scale: 2 }).default('0.00'),
	expenses: decimal({ precision: 10, scale: 2 }).default('0.00'),
	committedBy: varchar("committed_by", { length: 255 }).default('NULL'),
	date: timestamp({ mode: 'string' }).default('current_timestamp()').notNull(),
	classId: int("class_id"),
});

export const users = mysqlTable("users", {
	id: int().autoincrement().notNull(),
	name: varchar({ length: 100 }).notNull(),
	username: varchar({ length: 100 }).default('NULL'),
	email: varchar({ length: 150 }).notNull(),
	password: varchar({ length: 255 }).default('NULL'),
	referredBy: varchar("referred_by", { length: 255 }).default('NULL'),
	avatar: text().default('NULL'),
	role: mysqlEnum(['admin','instructor','parent','child']).default('child'),
	balance: decimal({ precision: 10, scale: 2 }).default('0.00'),
	referralCode: varchar("referral_code", { length: 255 }).default('NULL'),
	activeSub: varchar("active_sub", { length: 255 }).default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	dob: varchar({ length: 20 }).default('NULL'),
	gender: varchar({ length: 10 }).default('NULL'),
	city: varchar({ length: 50 }).default('NULL'),
	street: varchar({ length: 100 }).default('NULL'),
	stripeCustomerId: varchar("stripe_customer_id", { length: 255 }).default('NULL'),
	stripeSubscriptionId: varchar("stripe_subscription_id", { length: 255 }).default('NULL'),
	subscriptionStatus: varchar("subscription_status", { length: 50 }).default('NULL'),
	trialEndsAt: datetime("trial_ends_at", { mode: 'string'}).default('NULL'),
	stripeAccountId: varchar("stripe_account_id", { length: 255 }).notNull(),
	fcmToken: text("fcm_token").default('NULL'),
	sessionId: varchar("session_id", { length: 255 }).default('NULL'),
},
(table) => [
	unique("email").on(table.email),
	unique("email_2").on(table.email),
	unique("email_3").on(table.email),
	unique("uc_users_email").on(table.email),
	unique("username").on(table.username),
]);

export const userCards = mysqlTable("user_cards", {
	id: int().autoincrement().notNull(),
	userEmail: varchar("user_email", { length: 255 }).default('NULL'),
	paymentMethodId: varchar("payment_method_id", { length: 255 }).default('NULL'),
	brand: varchar({ length: 50 }).default('NULL'),
	last4: varchar({ length: 4 }).default('NULL'),
	expMonth: varchar("exp_month", { length: 2 }).default('NULL'),
	expYear: varchar("exp_year", { length: 4 }).default('NULL'),
	isDefault: tinyint("is_default").default(0),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
});

export const waitlist = mysqlTable("waitlist", {
	id: int().autoincrement().notNull(),
	fullname: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
},
(table) => [
	unique("email").on(table.email),
]);
