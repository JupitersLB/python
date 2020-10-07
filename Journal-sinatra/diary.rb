# Creates a diary with date and entry.
class Diary
  attr_accessor :date_input, :entry
  def initialize(date_input, entry)
    @date_input = date_input
    @entry = entry
  end
end
