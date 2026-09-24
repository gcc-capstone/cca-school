# Pigeon Connect
![Logo](./logo.png)

*Last updated: September 23rd, 2026*

**Team Members:**
- Peter Brumbach
- John Bauer
- Ella Kocher
- Alissa Hoover
- Lucas Sanderson

## Introduction
Central Christian Academy in Houston, PA needs a single, reliable way for its staff and families to communicate about students and their daily transportation arrangements. Pigeon Connect is a school communication platform designed to replace the academy's current communication app, giving teachers, parents, and administrators one place to share information about students and keep transportation status accurate and up to date. The system's primary users are the school's teachers and administrative staff, along with the parents and guardians of enrolled students.

Pigeon Connect's main features center on messaging and transportation management. Administrators can send announcements to the entire school, and teachers can message the parents of an entire class or start a one-on-one conversation with a specific family; parents can choose to receive these messages in the app, by email, or in a printable format. Parents can also notify the school of a change to their child's after-school transportation, such as switching from the bus to being picked up by a relative. Because an incorrect change could send a student home the wrong way, any transportation update requires approval from two staff members before it appears on a dashboard that shows teachers the current transportation status of each student in their homeroom.

## Representative Tasks
Because Pigeon Connect is intended to replace the school's current communication app, these representative tasks reflect the functions parents, teachers, and administrators currently rely on and will continue to need.

- **MVP**: Admins can contact all of the school.
Lisa, an administrator at the school, learns that the date of the upcoming Christmas concert has changed. She needs to notify all parents, teachers, and other administrators so that students arrive prepared on the correct date. Lisa creates a notification and sends it to everyone in the school.

- **MVP**: Teachers can contact the parents of all of the students in their class.
Mark, a science teacher, is planning a Friday experiment for his third-period class that requires students to bring in paper towel rolls from home. Since it is only Monday, he wants to notify those parents early enough for their children to bring the item in on time. Mark creates a notification for his third-period class specifically, so parents in his other science sections do not receive it.
Teachers can contact the parents of a particular student in a one-on-one conversation.
Amanda Bright is struggling in her sixth-grade math class, and her teacher, Ms. Roller, wants to discuss ways to support her with Amanda's parents. Ms. Roller starts a private conversation with only Amanda's parents to talk through possible options.

- **MVP**: Parents can be contacted via the app, by email, or in printed form.
Mary and John prefer physical records of important information so they can pin them to the corkboard in their kitchen. After they started using the new app for their son's school, they discovered they could receive notifications in the app, by email, or in a printable format. Now, whenever their son's teacher shares information about an upcoming date or event, Mary and John print the notification and post it next to their calendar.

- **MVP**: Parents can contact the school to communicate a change of transport for their child.
Holly's father has an unexpected out-of-town meeting and will not be home in the evening when Holly's bus arrives, so he has arranged for her grandparents to pick her up for the next few days. He uses the app to notify the school that Holly will be picked up by her grandparents instead of riding the bus home.

- **MVP**: Teachers can see the transportation status of the students on the dashboard of the app.
At the end of the school day, Mr. Smith, a tenth-grade homeroom teacher, needs to sort his students into pickup, bus, and after-school groups. His dashboard shows the current transportation status of each student in his homeroom, where he sees that Holly's status has changed from bus rider to parent pickup. This lets him place Holly in the correct group instead of sending her home on the bus by mistake.

- **MVP**: Two approvals by teachers/admins must be made before a student's end-of-day transportation status is updated accordingly on the dashboard.
When Holly's father calls to report the change, Lisa, the admin who takes the call, creates a transportation status change request and provides the first approval. Mr. Smith, Holly's end-of-day homeroom teacher, sees the pending request and provides the second approval. Once both approvals are recorded, Holly's status on the dashboard officially changes from bus rider to parent pickup for the day.

- **MVP**: At the end of the school year, the app's database is archived and cleared with only the necessary/repetitive information kept to make room for the student database next school year.
As the school year ends, administration begins preparing for the next one. Steve, the school's IT administrator, is responsible for maintaining the system database. He archives and saves this year's records, then clears the database to make room for the following year, ensuring that, for example, parents of next year's fifth graders no longer receive notifications meant for fourth graders. Steve also confirms that incoming students' contact information is uploaded to the system and that graduating students' families are removed from it.



## Related Work

### ClassDojo
ClassDojo is a website and application that allows communication between teachers and students, including the ability for teachers to add calendar events and send images that parents can view and interact with. Like ClassDojo, our application will support communication between school staff and parents, and will let parents choose how they want to receive updates, such as through the app, text, or email. However, our application will not include ClassDojo's behavior-points feature, which lets students earn points for behavior that parents can then view; instead, our application will focus more specifically on transportation communication, an area ClassDojo does not address. Our client already uses ClassDojo as an optional resource for parent communication, but our application would replace its communication functions with ones better suited to the school's needs, including office staff involvement in transportation updates. ClassDojo has a clean, inviting interface and is free to use, though it charges for a "plus" subscription that includes features such as read receipts showing whether a teacher has viewed a message. Our application will offer an equivalent feature, showing whether a parent's transportation change has been reviewed, at no additional cost, since our target users need this information as part of their core workflow rather than as a premium add-on (ClassDojo).

### Pikmykid
Pikmykid is a website focused on school safety, offering student hall passes, transportation-management tools, emergency reunification systems, and more. Its transportation feature is the most directly relevant to our application: like Pikmykid, our application will let parents make same-day or future changes to how their child gets home, such as switching between parent pickup and the bus. Our application will go further by pairing this transportation feature with the additional communication tools it provides, such as class-wide and one-on-one messaging between teachers and parents. Pikmykid also offers features outside our current scope, such as verifying that students are released to the correct adult and letting parents check in on arrival; these could be worth discussing as future additions once we have gathered more input from Central Christian Academy's teachers. Pikmykid is free for parents but requires a paid subscription for schools. Purchasing it would address the school's transportation needs but would include tools beyond what the school currently needs; our application will provide only the transportation and communication features the school has asked for, at no cost (Pikmykid).

### School Dismissal Manager
School Dismissal Manager is an application built specifically to address student transportation issues, allowing parents to update their child's transportation needs from their phone and helping schools manage the line of cars waiting for pickup. Like our application, it notifies teachers of student transportation changes and sends notifications to parents. The key difference is timing: School Dismissal Manager notifies teachers of all transportation changes at once, at the end of the day, while our application will require each change to be approved by a teacher and/or administrator and will notify the teacher as soon as the request comes in, rather than in a single end-of-day batch. This distinction matters for our target users because teachers like Mr. Smith need to know a student's updated status before dismissal begins, not after. School Dismissal Manager also has an outdated interface and, unlike our application, is only available as a phone app rather than through a website. One feature worth adopting from it is letting an administrator set a cutoff time after which parents can no longer submit changes for the day. School Dismissal Manager is not free, and it does not support communication between parents and teachers on topics unrelated to dismissal; a school would need to purchase it alongside a separate communication tool to meet all of its needs. Our application will meet both needs in a single free tool (SchoolDismissalManager).

### Seesaw
Seesaw is an application and website offering a range of school resources focused on student learning, including teacher-led AI tools, learning activities, and communication tools between parents and teachers. Our application will not include Seesaw's learning-focused features, but will draw on its communication tools, such as sending parents reminders they can interact with and supporting back-and-forth messaging between a parent and teacher. Seesaw also provides analytics on student performance; while our application is not focused on academics, a similar analytics feature tracking parent communication and transportation changes over time could be a useful addition. Seesaw's support for message translation into different languages is another feature worth considering, since it would make communication clearer for non-English-speaking families at Central Christian Academy. Seesaw is free with optional paid features for teachers. Although it offers far more tools than our application will, its core communication features are closely aligned with what our application will provide, alongside our transportation-specific tools (SeeSaw).



## Bibliography

ClassDojo. "ClassDojo Plus." ClassDojo, https://www.classdojo.com/plus/. Accessed 20 Sept. 2026.

Pikmykid. "Dismissal Management." Pikmykid, https://www.pikmykid.com/solutions/dismissal-management. Accessed 20 Sept. 2026.

SchoolDismissalManager. "How It Works." SchoolDismissalManager, https://www.schooldismissalmanager.com/HowItWorks.aspx. Accessed 20 Sept. 2026.

Seesaw. "Seesaw." Seesaw, https://seesaw.com/. Accessed 20 Sept. 2026.