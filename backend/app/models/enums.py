from enum import Enum

class UserRole(str, Enum):
    CUSTOMER = "customer"
    TECHNICIAN = "technician"
    ADMIN = "admin"

class BookingStatus(str, Enum):
    PENDING = "pending"
    AI_ANALYZING = "ai_analyzing"
    TECHNICIAN_ASSIGNED = "technician_assigned"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"


class Severity(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    EMERGENCY = "emergency"




class TechnicianSpecialization(str, Enum):
    PLUMBER = "plumber"
    ELECTRICIAN = "electrician"
    AC = "ac"
    APPLIANCE = "appliance"
    CARPENTER = "carpenter"
    PAINTER = "painter"