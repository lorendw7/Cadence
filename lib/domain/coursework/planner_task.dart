class PlannerTask {
  final String id;
  final String title;
  final bool isCompleted;

  PlannerTask({
    required this.id,
    required this.title,
    this.isCompleted = false,
  });

  PlannerTask copyWith({bool? isCompleted}) {
    return PlannerTask(
      id: id,
      title: title,
      isCompleted: isCompleted ?? this.isCompleted,
    );
  }
}
