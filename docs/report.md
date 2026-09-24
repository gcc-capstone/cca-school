# Pigeon Connect
![Logo](./logo.png)

*Last updated: September 24th, 2026*

**Team Members:**
- Peter Brumbach
- John Bauer
- Ella Kocher
- Alissa Hoover
- Lucas Sanderson

## Introduction

Pigeon Connect is a school communication application being developed for our client, Central Christian Academy in Houston, PA, to replace the school's current app. The purpose of this project is to streamline communication among teachers, parents, and administrators and to keep student information, particularly transportation arrangements, accurate and accessible to everyone who needs it. The target users are the teachers and parents associated with the school, along with the administrators and other faculty who send school-wide announcements and manage student records. Because student information changes frequently, the application is designed so that it can be updated as needed.

The main features of Pigeon Connect support communication and transportation management. Teachers and parents can exchange direct messages, and teachers and administrators can send announcements to a single class or to the entire school. Parents choose how they receive these notifications: through the app, by email, or in a printable form. For transportation, parents can update their child's transportation type when plans change, and teachers and administrators must approve each change before it appears on the transportation dashboard that teachers use at the end of the school day.

## Representative Tasks

Pigeon Connect is intended to functionally replace the school's current communication app, so the representative tasks below reflect the functions the school currently uses and needs. Each task describes a realistic goal for one of the application's target users: administrators, teachers, or parents. Tasks marked **MVP** are the ones the team currently expects to support in the minimum viable product. This designation is tentative and may change as the project scope is refined.

- **MVP:** Admins can view all students in the school.
    - Lisa is an admin at the school. She receives a call from Jill's parents. They do not know whether they have an account in Pigeon Connect, so they ask Lisa to check for them. After logging on, she can see every account affiliated with the school. She locates Jill's account and confirms to the parents that Jill is in the system.

- **MVP:** Teachers can view all students in their classes.
    - Mark, a science teacher, is trying to learn the names of all the students in his classes. Although he is usually great at remembering names, a few students from his chemistry class keep slipping his mind. He logs into Pigeon Connect, locates his chemistry class, and finds the names of the three students he forgot.

- **MVP:** Admins can contact everyone associated with the school.
    - Lisa is an admin at the school. She learns that the date of the upcoming Christmas concert has changed. She creates a notification and sends it to all the parents, teachers, and other admins so that the students will be ready on the correct date.

- **MVP:** Teachers can contact the parents of all the students in one of their classes.
    - As a science teacher, Mark enjoys giving his students fun experiments to do in class. Sometimes these experiments require students to bring in something from home. Mark wants to do an experiment involving paper towel rolls on Friday. It is currently Monday, and he wants to notify the parents so that their children have paper towel rolls in time. Mark creates a notification for his third-period science class that is sent to the parents of that class only, not to the parents of all his science classes.

- **MVP:** Teachers can contact the parents of a particular student in a one-on-one conversation.
    - Amanda Bright has been struggling in her sixth-grade math class. Her teacher, Ms. Roller, wants to meet with Amanda's parents to discuss options for supporting her better. Ms. Roller messages only Amanda's parents so that they can talk through the options.

- **MVP:** Parents can receive communications from the school through the app, by email, or in printed form.
    - Mary and John prefer to have physical records of important information so that they can pin it to the cork board in their kitchen. When they began using the new app for their son's school, they noticed that they could receive notifications from the school in the app, by email, or in a printable form. Now, every time their son's teacher communicates important information about upcoming dates and events, Mary and John easily print the notification and pin it next to their calendar in the kitchen.

- **MVP:** Parents can contact the school to communicate a change of transportation for their child.
    - Holly's father has an emergency that requires him to travel out of town for a meeting, so he will not be home in the evening when Holly gets off her bus. He has asked Holly's grandparents to watch her for the next few days. To communicate this change, Holly's father contacts the school through the app to say that his daughter will be picked up by her grandparents instead of taking the bus home.

- **MVP:** Teachers can see the transportation status of their students on the dashboard of the app.
    - It is the end of the school day, and students are getting ready to leave. Mr. Smith, the homeroom teacher for the tenth-grade class, needs to separate the students into groups for pickup, bus, and after-school programs. Through the app, he sees the transportation status of each of his homeroom students on his dashboard. He notices that Holly was changed from bus line to parent pickup, so he can make sure she is in the correct group and does not accidentally get on the bus home.

- **MVP:** Two approvals by teachers or admins must be made before a student's end-of-day transportation status is updated on the dashboard.
    - When Holly's father notifies the school that Holly will be parent pickup and not on the bus, Lisa, the admin who received the phone call, creates a transportation status change request and enters one approval for it. Mr. Smith, Holly's end-of-day homeroom teacher, sees the change request and gives the second approval. Holly's transportation status on the dashboard is then officially changed from bus line to parent pickup for the day.

- **MVP:** At the end of the school year, the app's database is archived and cleared, keeping only the necessary and recurring information, to make room for the next school year's student database.
    - The school year is over, and administration is already preparing for the next one. Steve, the school's IT expert, is in charge of the system database. He archives all of the records from this school year and clears the database so that, when next year's student database is uploaded, the parents of the fifth-grade class will not still receive notifications meant for the fourth-grade class. Steve also ensures that the contact information of new students' parents is uploaded into the system, while the parents of graduates are no longer in the system after the archive and clearing process.

- Teachers can schedule events for their class.
    - Mr. Allen, an eighth-grade science teacher, wants to take his students on a field trip to the Carnegie Science Center. Using the app, he creates an event entry that is visible to all the parents in the class.

- Admins can schedule events for the school.
    - Lisa, an admin for the school, wants to alert all parents about the Fall Ball coming up in a month. Using the app, she creates an event entry so that parents know when the Fall Ball is happening.

- All users can view their respective calendars.
    - Dave is the parent of an eighth-grade student and a high school junior. He wants to know whether any upcoming events require his attention. After logging onto the app, he views his calendar, which displays a field trip for his eighth grader and a dance for his high school junior.

## Related Work

### ClassDojo
ClassDojo is a website and application that allows communication between teachers and students. It includes the ability for teachers to add calendar events and send images that parents can view and interact with. ClassDojo contains some elements that will not be included in our school communication application. An example is providing an option for students to gain points for behavior which is also viewable for parents. Our application will not have that feature, but will contain more options for better communication between school staff and parents on changing and viewing transportation updates. It will also contain more options for parents to decide how they want to recieve updates, such as through text or email. Our client already uses this application as an optional resource for parents to better communicate with parents. Our application would replace the communication aspects of ClassDojo, making them better suited towards the school's needs, specifically providing office staff to be included in transportation communication and sending out information to parents. CLassDojo has a very clean and inviting interface. It is a free application but has "plus" version that costs money. Our application may be able to add some of these costly features for free. One example is that our application will show if transportation changes from a parent have been reviewed. ClassDojo requires payment for the "plus" subscription to see if a message has been viewed by a teacher or not. Our school communication application will be able to add free features matching the school's specific needs (ClassDojo).

### Pikmykid
Pikmykid is a website that is focused on school safety. It provides student hall passes, tools to help transportation run smoothly, emergency reunification systems, and more. Our school communictaion application relates to this website in the way it handles changing student transportation needs. It provides a way for parents to make same day or future changes for how their child needs to get home, such as being picked up by a parent or riding the bus. This is exactly what our application will do, as well as our application having other communication functions. Pikmykid has some features that may be useful additions in the future to our applicatin as we spend more time collecting information from current teachers at Central Christian Academy. An example is making sure students get released to the correct adult and provides a way for parents to check in when they arrive to pick up their child. These features are not the focus of our application, but may be discussed as future additions. Parents can download this application for free, but it is not free for schools to use. Purchasing this application would help solve Central Christian Academy's transportation issues, but they would be paying for more tools than they may actually need. We will be able to provide the exact features the school would like for free (Pikmykid).

### School Dismissal Manager
School Dismissal Manager is an application made to fix issues specifically in student transportation in schools. It allows for parents to have an application on their phone to make updates about their child's transportation needs. It also provides a system to handle lines of cars that are waiting to pick up students. It provides some of the same features our school communication applciation will provide such as updating teachers on student tranportation changes through the applciation and has app notifications sent to parents. One major difference in the way teachers will be notified of changes is that teachers are only notified of all student transportation changes at the end of the day. Our application will have the changes need approval from the teacher and/or office administrators (admin) and will notify the teacher when the request comes, not all at once at the end of the day. School Dismissal Manager has an out of date interface as well as not providing the option of parents using it through a website, not just an application needing to be installed on their phone. It does provide the option of the admin setting a time by which parents can no langer make changes. This would be a useful feature for our application. It is not free to use and does not offer an option for communication between parents and teachers that is not dismissal related. Central Christian Academy would need to purchase this application as well as a communication application to fix all of their needs. This makes things potentially harder and more confusing more staff and parents to need multiple apps or websites to have good and clear communication. Our school communication application will fulfill both of these needs for the school for free (SchoolDismissalManager).

### Seesaw
Seesaw is an application and website that provides many resources for schools focused on helping students learn. It provides teacher-led AI, learning activities and tools for students, communication tools between parents and teachers, and more. Our school communication application will not contain all of these features, but will focus on the same communication type tools that it provides. It allows for teachers to send out reminders to parents which they can interact with as well as back and forth messaging betweena parent and teacher. Something interesting Seesaw provides is analytics on student performance. While our application is not focused on student performance, it may include a similar feature of viewing analytics on parent commmunicatin changes throughout the year. Seesaw also allows messages to be translated to differnt languages to help make communication clearer and more inclusive which may be a beneficial feature to our application. It is a free application but has premium features for teachers that can be purchased. While this application provides a lot more tools than ours, it has a very similar communication piece that will be included in our application as well as our transportation communication tool (SeeSaw).




## Bibliography

ClassDojo. "ClassDojo Plus." ClassDojo, https://www.classdojo.com/plus/. Accessed 20 Sept. 2026.

Pikmykid. "Dismissal Management." Pikmykid, https://www.pikmykid.com/solutions/dismissal-management. Accessed 20 Sept. 2026.

SchoolDismissalManager. "How It Works." SchoolDismissalManager, https://www.schooldismissalmanager.com/HowItWorks.aspx. Accessed 20 Sept. 2026.

Seesaw. "Seesaw." Seesaw, https://seesaw.com/. Accessed 20 Sept. 2026.
