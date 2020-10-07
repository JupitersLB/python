# Creates a student with name and csv_file_path.
class User
  attr_reader :name, :csv_file_path
  def initialize(name)
    @name = name
    @csv_file_path = "#{@name}_entries.csv"
  end
end
