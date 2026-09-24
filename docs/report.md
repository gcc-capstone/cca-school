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

This section compares Pigeon Connect with four existing products that offer similar communication or transportation features: ClassDojo, Pikmykid, School Dismissal Manager, and Seesaw. Each comparison identifies what our application will share with the product, where it will differ, and what our team learned from the comparison.

### ClassDojo

ClassDojo is a website and application that allows communication between teachers and students. It includes the ability for teachers to add calendar events and send images that parents can view and interact with. ClassDojo contains some elements that will not be included in our school communication application. An example is an option for students to gain points for behavior, which is also viewable by parents. Our application will not have that feature but will contain more options for communication between school staff and parents about changing and viewing transportation updates. It will also give parents more options for how they receive updates, such as through text or email.

Our client already uses ClassDojo as an optional resource for parents to communicate with teachers. Our application would replace the communication aspects of ClassDojo, making them better suited to the school's needs, specifically by including office staff in transportation communication and in sending information to parents. ClassDojo has a very clean and inviting interface. It is free but has a "Plus" version that costs money. Our application may be able to add some of these costly features for free. One example is that our application will show whether a transportation change from a parent has been reviewed. ClassDojo requires the paid "Plus" subscription to see whether a teacher has viewed a message. Our application will add free features that match the school's specific needs (ClassDojo).

### Pikmykid

Pikmykid is a website that focuses on school safety. It provides student hall passes, tools to help transportation run smoothly, emergency reunification systems, and more. Our school communication application relates to Pikmykid in the way it handles changing student transportation needs. Pikmykid provides a way for parents to make same-day or future changes to how their child gets home, such as being picked up by a parent or riding the bus. Our application will do the same, and it will also have other communication functions.

Pikmykid has some features that may be useful future additions to our application as we spend more time collecting information from current teachers at Central Christian Academy. Examples are making sure students are released to the correct adult and providing a way for parents to check in when they arrive to pick up their child. These features are not the focus of our application but may be discussed as future additions. Parents can download the Pikmykid application for free, but it is not free for schools to use. Purchasing it would help solve Central Christian Academy's transportation issues, but the school would be paying for more tools than it may need. We will be able to provide the exact features the school wants for free (Pikmykid).

### School Dismissal Manager

School Dismissal Manager is an application made to address issues specific to student transportation in schools. It allows parents to use an application on their phone to make updates about their child's transportation needs. It also provides a system to handle lines of cars waiting to pick up students. It provides some of the same features our school communication application will provide, such as updating teachers on student transportation changes through the application and sending app notifications to parents.

One major difference is in how teachers are notified of changes. In School Dismissal Manager, teachers are notified of all student transportation changes only at the end of the day. In our application, changes will need approval from the teacher and/or office administrators (admins), and the teacher will be notified when the request arrives rather than all at once at the end of the day. School Dismissal Manager has an outdated interface and does not let parents use it through a website; it must be installed on their phones. It does let an admin set a time after which parents can no longer make changes, which would be a useful feature for our application.

School Dismissal Manager is not free to use, and it does not offer communication between parents and teachers that is unrelated to dismissal. Central Christian Academy would need to purchase this application as well as a communication application to meet all of its needs. This could make communication harder and more confusing, because more staff and parents would need multiple apps or websites to communicate clearly. Our school communication application will fulfill both needs for the school for free (SchoolDismissalManager).

### Seesaw

Seesaw is an application and website that provides many resources for schools, focused on helping students learn. It provides teacher-led AI, learning activities and tools for students, communication tools for parents and teachers, and more. Our school communication application will not contain all of these features but will focus on the same kinds of communication tools. Seesaw allows teachers to send reminders that parents can interact with, as well as back-and-forth messaging between a parent and a teacher.

Seesaw also provides analytics on student performance. While our application is not focused on student performance, it may include a similar feature for viewing analytics on parent communication changes throughout the year. Seesaw also allows messages to be translated into different languages, which makes communication clearer and more inclusive and may be a beneficial feature for our application. Seesaw is free but has premium features that teachers can purchase. While Seesaw provides many more tools than our application, its communication features are very similar to those we will include, alongside our transportation communication tool (Seesaw).


## Bibliography

ClassDojo. "ClassDojo Plus." ClassDojo, https://www.classdojo.com/plus/. Accessed 20 Sept. 2026.

Pikmykid. "Dismissal Management." Pikmykid, https://www.pikmykid.com/solutions/dismissal-management. Accessed 20 Sept. 2026.

SchoolDismissalManager. "How It Works." SchoolDismissalManager, https://www.schooldismissalmanager.com/HowItWorks.aspx. Accessed 20 Sept. 2026.

Seesaw. "Seesaw." Seesaw, https://seesaw.com/. Accessed 20 Sept. 2026.
