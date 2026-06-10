from app.audit_logs import AuditLog


def create_audit_log(
    db,
    user_email,
    action,
    entity_type,
    entity_id
):
    log = AuditLog(
        user_email=user_email,
        action=action,
        entity_type=entity_type,
        entity_id=str(entity_id)
    )

    db.add(log)
    db.commit()
    db.refresh(log)

    return log


def get_audit_logs(db):
    return db.query(AuditLog).all()