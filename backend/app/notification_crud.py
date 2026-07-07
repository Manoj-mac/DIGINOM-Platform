from app.notification import Notification


def create_notification(

    db,

    user_email,

    title,

    message
):

    notification = Notification(

        user_email=user_email,

        title=title,

        message=message
    )

    db.add(notification)

    db.commit()

    db.refresh(notification)

    return notification


def get_notifications(

    db,

    user_email
):

    return db.query(
        Notification
    ).filter(

        Notification.user_email
        ==
        user_email

    ).order_by(

        Notification.created_at.desc()

    ).all()


def mark_as_read(

    db,

    notification_id
):

    notification = db.query(
        Notification
    ).filter(

        Notification.notification_id
        ==
        notification_id

    ).first()

    if notification:

        notification.is_read = True

        db.commit()

    return notification